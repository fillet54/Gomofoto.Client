import {bindable, inject} from 'aurelia-framework';
import {Session} from '../session';
import {User} from './user';

@inject(Session)
export class UserCard {
   @bindable userModel; 

   constructor(session) {
      this._session = session;
   } 

   get user() {
      return new User(this.userModel);
   }
}
