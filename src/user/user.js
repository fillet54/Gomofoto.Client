import {gravatarUrl} from '../utils/gravatar';
import {Session} from '../session';

export class User {
   constructor (userModel) {
      this._userModel = userModel;
   }

   get id() {
      return this._userModel.Id;
   }

   get firstName() {
      return this._userModel.FirstName;
   }

   get fullName() {
      return `${this._userModel.FirstName} ${this._userModel.LastName}`;
   }

   get email() {
      return this._userModel.EmailAddress;
   }

   get username() {
      return this._userModel.Username;
   }

   get albums() {
      return this._userModel.Albums;
   }

   get location() {
      return null;
   }

   get twitterHandle() {
      return null;
   }

   getAvatarUrl(size) {
      if (this._userModel.EmailAddress) {
         return gravatarUrl(this._userModel.EmailAddress, size);
      }
      else {
         return `http://placehold.it/${size}x${size}`;
      }
   }
}
