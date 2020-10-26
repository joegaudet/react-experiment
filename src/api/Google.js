import { AbstractClient, API } from './Api';
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
    if (calendar.isLoaded) {
      return calendar;
    }

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

    // Map to layout concerns events
    const events = response.result.items.map((event) => ({
      id: event.id,
      name: event.summary,
      allDay: !!event.start.date & !!event.end.date,
      start: dayjs(event.start.date ?? event.start.dateTime),
      end: dayjs(event.end.date ?? event.end.dateTime),
    }));


    console.log(JSON.stringify(response.result.items, null, 2));

    Log.info(`Found ${events.length} for calendar id:${calendar.id}`);

    return {...calendar, isLoaded: true, events};
  }

  async loadCalendars() {
    const response = await window.gapi.client.calendar.calendarList.list();

    this.calendars = response.result.items
      .map((calendar) => ({
        id: calendar.id,
        name: calendar.summary,
        color: calendar.backgroundColor,
      }));

    return this.calendars;
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
