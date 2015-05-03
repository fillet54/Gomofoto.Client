import {singleton} from 'aurelia-framework';
import {LogManager} from 'aurelia-framework';

var log = LogManager.getLogger('session');

var GUEST_USER = {
   id: -1,
   firstName: '',
   lastName: '',
   emailAddress: '',
   username: '', 
   isGuest: true 
};

@singleton()
export class Session {
   constructor() {
      this.user = GUEST_USER;
   }

   get isSignedIn() {
      return this.user !== GUEST_USER;
   }

   get isCurrentUser(user) {
      return this.user === user;
   }

   initSession(user) {
      log.info(`Initilizing session for ${user.Username}`); 
      this.user = user;
   }

   clearSession() {
      log.info(`Clearing session for ${this.user.Username}`); 
      this.user = GUEST_USER;
   }
}
