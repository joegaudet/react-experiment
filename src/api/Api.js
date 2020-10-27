// if we were in TypeScript this would maybe be an interface
import { Log } from '../util/log';

export class RdyEvent {
  id;
  name;
  start;
  end;
  allDay;
  localIntersectionIndex = 0;
  globalCalendarEventOffset;

  constructor(id, name, start, end, allDay) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.allDay = allDay;
  }

  get intervalKeys() {
    const intervals = this.allDay ? 25 * 15 : Math.round(this.end.diff(this.start, 'minute') / 15);

    // is there a REACTey way to memo things?
    this._intersectionKeys = this._intersectionKeys ||
      new Array(intervals)
        .fill(this.start)
        .map((date, index) => date.add(index * 15, 'minutes').toDate().getTime());

    return this._intersectionKeys;
  }
}

export class RdyCalendar {

  /** @type {string} **/
  id;
  /** @type {string} **/
  name;
  /** @type {string} **/
  color;
  /** @type {string} **/
  timeZone;
  /** @type {RdyEvent[]} **/
  events;

  constructor(id, name, color, timeZone, events = null) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.timeZone = timeZone;

    if (events) {
      this.events = events;
    }
  }

  /**
   * TODO pull this stuff out of the side effect of assignment
   *
   * Basic algorithm borrowed from determining intersection in a quadtree
   *
   * For each event insert the event in every 15 minute bucket it belongs in.
   *
   * For each event when rendering, find the bucket that is most full,
   * and assign my left offset based on offset of the event previous to the current event.
   *
   * NOTE: we could actually do this on a global level instead to make inter calendar
   * intersection more straight forward.
   *
   * NOTE: There's likely a more efficient bin packing version of this solution for when
   * events belong to different calendars.
   *
   * @param {RdyEvent[]} events
   */
  set events(events) {
    const map = new Map();

    // group the events by 15 minute bucket
    events.forEach((event) => {
      event.intervalKeys.forEach((key) => {
        let bucket = map.get(key) ?? [];
        bucket.push(event);
        map.set(key, bucket);
      });
    });

    // for each event, find the bucket it's in with the largest
    // length, and get it's index
    events.forEach((event) => {
      const biggestBucket = event
        // for each of my keys
        .intervalKeys
        // find the largest bucket
        .reduce((lastBucket, key) => {
          const bucket = map.get(key);
          return bucket.length > lastBucket.length ? bucket : lastBucket
        }, [])

      const eventIndex = biggestBucket.indexOf(event);

      // Make my index the +1 of the largest index inside of my shared bucket so we always stack to the right
      event.localIntersectionIndex = eventIndex === 0 ? 0 : biggestBucket[eventIndex - 1].localIntersectionIndex + 1;
    });

    super.events = events;
  }
}

export class AbstractClient {

  name;
  isAuthorized = false;
  authorizationListeners = [];

  async init() {
    throw `Init not implemented in ${this.name}`;
  }

  async authorize() {
    throw `authorize not implemented in ${this.name}`;
  }

  async revokeAuthorization() {
    throw `revokeAuthorization not implemented in ${this.name}`;
  }

  async load(calendarId) {
    throw `load not implemented in ${this.name}`;
  }

  /** @return {Promise<RdyEvent>} */
  async loadEvents(calendarId) {
    throw `events not implemented in ${this.name}`;
  }

  /** @return {Promise<RdyCalendar>} */
  async loadCalendars() {
    throw `events not implemented in ${this.name}`;
  }

  notifyAuthListeners(value) {
    this.authorizationListeners.forEach(_ => _(value));
  }

  subscribeToAuthStatus(func) {
    this.authorizationListeners.push(func);
  }

  unsubscribeFromAuthStatus(func) {
    this.authorizationListeners = this.authorizationListeners.filter(_ => _ !== func);
  }

}

export class API {

  static async bootstrap() {
    Log.info('API: Bootstrap')
    // initialize any registered clients
    await Promise.all(this.clients.map(_ => _.init()));
  }

  static registry = {};

  static registerClient(clientClass) {
    // TODO in the future we would probably load env config from here.
    const client = new clientClass({});
    this.registry[client.name] = client;
  }

  static get clients() {
    return Object.values(this.registry);
  }

  static clientFor(name) {
    return this.registry[name];
  }
}
