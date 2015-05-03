import {inject, bindable} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {User} from '../user/user';
import {DataService} from '../services/dataservice';
import {ThumbnailAlbum} from './thumbnail-album';


@inject(DataService)
export class Gallery {
   @bindable userModel;

   constructor(dataservice) {
      this.dataservice = dataservice;
      this.albums = [];
      this.isLoading = true;
   }

   attached() {
      this.loadAlbums().then(_ => {
         this.isLoading = false;
      });
   }

   loadAlbums() {
      return this.dataservice.getAlbumsForUser(this.userModel.Id).then(query => {
         if (query.results.length !== 0) {
            this.albums = query.results;
         }
         else {
            log.info(`User "${this.userModel.Username}" does not exist`);
            return new Redirect('/error/404');
         }
      },
      error => {
         log.error(`Error while looking up ${this.userModel.Username}`)
         return new Redirect('/error/404');
      });
   }

   get user() {
      return new User(this.userModel);
   }


   get albums() {
      return this._albums;
   }

   set albums(value) {
      this._albums = value.map(a => { return new ThumbnailAlbum(a); });
   }

}


