import {inject, bindable, ObserverLocator} from 'aurelia-framework';
import {User} from './user/user';

@inject(ObserverLocator)
export class NavBar {
   @bindable router;
   @bindable session; 

   constructor(observerLocator) {
      this.observerLocator = observerLocator;
   }

   get isSignedIn() {
      return this.session.isSignedIn;
   }

   get user() {
      return new User(this.session.user);
   }   

   logout() {
      log.info("Logging out");
      return this.router.navigate('/logout'); 
   }
}
