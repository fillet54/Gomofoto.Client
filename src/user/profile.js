import {inject, LogManager} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {Session} from '../session';
import {DataService} from '../services/dataservice';
import {User} from './user';

var log = LogManager.getLogger('profile');

@inject(Session, DataService)
export class Profile {
   constructor(session, dataservice) {
      this.session = session;
      this.dataservice = dataservice;
   }
  
   canActivate(params) {
      return this.dataservice.getUserByIdWithAlbums(params.id).then(users => {
         if (users.results.length !== 0) {
            this.user =  new User(users.results[0]);
            return true;
         }
         else {
            log.info(`User with id ${params.id} does not exists.`);
            return new Redirect('/error/404');
         }
      },
      error => {
         log.error(`Error while looking up user`)
         return new Redirect('/error/404');
      });
   }

   activate(params) {
      log.info("Activating");
   }

   get isCurrentUser() {
      return this.session.user.Id == this.user.id;
   } 
}

