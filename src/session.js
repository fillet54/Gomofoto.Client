import {singleton} from 'aurelia-framework';
import {LogManager} from 'aurelia-framework';

var log = LogManager.getLogger('session');

var GUEST_USER = { isGuest: true };

@singleton()
export class Session {
   constructor() {
      this.user = GUEST_USER;
   }

   initSession(user) {
      log.info(`Initilizing session for ${user.Username}`); 
      this.user = user;
   }

   clearSession() {
      log.info(`Clearing session for ${this.user.Username}`); 
      this.user = GUEST_USER;
   }

   get isLoggedIn() {
      return this.user !== GUEST_USER; 
   }
}
