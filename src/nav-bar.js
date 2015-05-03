import {bindable} from 'aurelia-framework';

export class NavBar {
   @bindable router;
   @bindable session; 

   get isSignedIn() {
      return this.session.isSignedIn;
   }

   get user() {
      return this.session.user;
   }

   logout() {
      log.info("Logging out");
      return this.router.navigate('/logout'); 
   }
}
