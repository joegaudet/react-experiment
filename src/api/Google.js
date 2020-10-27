import { AbstractClient, API, RdyCalendar, RdyEvent } from './Api';
import { Log } from '../util/log';
import dayjs from 'dayjs';

// TODO these should be stored in environment variables to be injected at build time OR should be fetched before application
// bootstrap

// Client ID and API key from the Developer Console
const clientId = '598042910761-0fq80u6osv2o7d688qvmag381g52lk1m.apps.googleusercontent.com';
const apiKey = 'AIzaSyD5xRwD93TzzBMykYksaw8GwLtWhDAG8hM';

// Array of API discovery doc URLs for APIs used by the quickstart
const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const scope = "https://www.googleapis.com/auth/calendar.readonly";

export function transformEvent(event) {
  const start = dayjs(event.start.date ?? event.start.dateTime);
  const end = dayjs(event.end.date ?? event.end.dateTime);

  const differentDays = start.day() !== end.day();
  const diff = Math.round(end.diff(start, 'day', true));
  const allDay = !!event.start.date && !!event.end.date

  // We can probably do away with this branch somehow, need a bit of time to think about it.
  if (differentDays) {
    const length = diff + 1;
    return new Array(length)
      .fill(start)
      .map((day, i) => {

        let eventStart;
        let eventEnd;

        if (allDay) {
          eventStart = start.add(i, 'day').startOf('day');
          eventEnd = start.add(i, 'day').endOf('day');
        } else {
          eventStart = i === 0 ? start : start.add(i, 'day').startOf('day');
          eventEnd = i === length - 1 ? end : start.add(i, 'day').endOf('day');
        }

        return new RdyEvent(
          event.id,
          event.summary,
          eventStart,
          eventEnd,
          allDay
        )
      });
  } else {
    return [
      new RdyEvent(
        event.id,
        event.summary,
        allDay ? start.startOf('day') : start,
        allDay ? start.endOf('day') : end,
        allDay
      )
    ]
  }
}

export function transformCalendar(calendar) {
  return new RdyCalendar(
    calendar.id,
    calendar.summary,
    calendar.backgroundColor,
    calendar.timeZone
  )
}

export class Google extends AbstractClient {

  name = 'Google';

  // Theory being that config will be passed in from the main calendar API facade
  // TODO.
  constructor(_config) {
    super();
  }

  async init() {
    // Initial Load API isn't promise aware
    return new Promise((resolve, reject) => {
      Log.info('Initializing Google API Client')

      window.gapi.load('client:auth2', async () => {
        try {
          Log.info('Google API Client Loaded')

          await window.gapi.client.init({apiKey, clientId, discoveryDocs, scope});

          window.gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateAuthenticatedStatus);

          this._updateAuthenticatedStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

          resolve();
        } catch (e) {
          Log.error('Error loading Google API Client');
          Log.error(e);

          reject(e);
        }
      });
    });
  }

  async authorize() {
    Log.info('Authorizing Google API Client');
    window.gapi.auth2.getAuthInstance().signIn();
  }

  async revokeAuthorization() {
    Log.info('Signing Out ofGoogle API Client');
    window.gapi.auth2.getAuthInstance().signOut();
  }

  async loadEvents(calendar) {
    Log.info(`Loading events for calendar id:${calendar.id}`);

    const response = await window.gapi.client.calendar.events.list({
      'calendarId': calendar.id,
      'timeMin': (new Date()).toISOString(),
      'timeMax': dayjs().add(7, 'day').toDate().toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 20,
      'orderBy': 'startTime'
    });

    calendar.events = response.result.items.map(transformEvent).flat()
    return calendar;
  }

  async loadCalendars() {
    const response = await window.gapi.client.calendar.calendarList.list();
    return this.calendars = response.result.items.map(transformCalendar);
  }

  async load() {
    const calendars = await this.loadCalendars()
    this.calendars = await Promise.all(calendars.map((calendar) => this.loadEvents(calendar)));
  }

  _updateAuthenticatedStatus = async (isAuthorized) => {
    if (isAuthorized) {
      await this.load();
    }

    this.isAuthorized = isAuthorized;
    this.notifyAuthListeners(isAuthorized);
  }

}

API.registerClient(Google);
