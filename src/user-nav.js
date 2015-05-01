import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Session} from './session';
import {LogManager} from 'aurelia-framework';

var logger = LogManager.getLogger('user-nav');

@inject(Router, Session)
export class UserNav {
   constructor(router, session) {
      this.router = router;
      this.session = session;
   }

   get isSignedIn() {
      return this.session ? this.session.isLoggedIn : false;
   }

   get displayName() {
      return this.session.user.Name;
   }

   get fullName() {
      return `${this.session.user.FirstName}  ${this.session.user.LastName}`;
   }

   get email() {
      return this.session.user.EmailAddress;
   }

   get username() {
      return this.session.user.Username;
   }

   logout() {
      this.session.user = null;
      router.navigate(''); 
   }
}
