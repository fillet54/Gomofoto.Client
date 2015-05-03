import {inject, LogManager} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {DataService} from '../services/dataservice';
import {User} from './user';
import {Session} from '../Session';

var log = LogManager.getLogger('profile');

@inject(Session, DataService)
export class Profile {
   constructor(session, dataservice) {
      this.session = session;
      this.dataservice = dataservice;
   }
  
   canActivate(params) {
      return this.dataservice.getUserByUsername(params.username).then(users => {
         if (users.results.length !== 0) {
            this.user =  users.results[0];
            return true;
         }
         else {
            log.info(`User "${params.username}" does not exist`);
            return new Redirect('/error/404');
         }
      },
      error => {
         log.error(`Error while looking up ${params.username}`)
         return new Redirect('/error/404');
      });
   }

   activate(params) {
      log.info("Activating");
   }

   get isCurrentUser() {
      return this.session.user.id == this.user.id;
   } 
}

