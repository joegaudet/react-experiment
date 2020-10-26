// if we were in TypeScript this would maybe be an interface
import { Log } from '../util/log';

export class AbstractClient {

  name;
  isAuthorized = false;
  listeners = [];

  async init() {
    throw `Init not implemented in ${this.name}`;
  }

  async authorize() {
    throw `authorize not implemented in ${this.name}`;
  }

  async revokeAuthorization() {
    throw `revokeAuthorization not implemented in ${this.name}`;
  }

  /** @return {Promise<RdyEvent>} */
  async events() {
    throw `events not implemented in ${this.name}`;
  }

  /** @return {Promise<RdyEvent>} */
  async calendars() {
    throw `events not implemented in ${this.name}`;
  }

  notifyAuthListeners(value) {
    this.listeners.forEach(_ => _(value));
  }

  subscribeToAuthStatus(func) {
    this.listeners.push(func);
  }

  unsubscribeFromAuthStatus(func) {
    this.listeners = this.listeners.filter(_ => _ !== func);
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
}
