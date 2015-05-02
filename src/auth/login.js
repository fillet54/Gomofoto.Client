import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LogManager} from 'aurelia-framework';
import {Session} from '../session';
import {DataService} from '../dataservice';

var logger = LogManager.getLogger('Login');

@inject(Session, DataService, Router)
export class Login {
   constructor(session, dataservice, router) {
      this.router = router;
      this.session = session;
      this.dataservice = dataservice;
      this.username = '';
      this.password = '';
      this.errorMessage = '';
   }

   activate() {
      logger.info("Activation Login");
   }

   get hasError() {
     return this.errorMessage != ''; 
   }

   login() {
      return this.dataservice.getUserByUsername(this.username).then(users => {
         if (users.results.length !== 0) {
            this.errorMessage = '';
            this.session.initSession(users.results[0]);
            return this.router.navigate('gomofoto');
         }
         else {
            this.errorMessage = "Invalid username and/or password";
         }
      },
      error => {
         this.errorMessage = "Error while authorizing user. Please try again.";
         logger.error("Error while authorizing user. Please try again.")
      });
   }
}
