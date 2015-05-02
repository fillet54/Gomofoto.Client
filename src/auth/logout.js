import {LogManager, noView, inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {Session} from '../session';

var log = LogManager.getLogger('authorization');

@inject(Session)
@noView
export class Logout {

   constructor(session) {
      this.session = session;
   }

   canActivate() {
      var msg = this.session.isLoggedIn ? `Logging out ${this.session.user.Username}` :
                                          "Logout performed with no user logged in";
      log.info(msg);
      this.session.clearSession();
      return new Redirect(''); 
   }
}
