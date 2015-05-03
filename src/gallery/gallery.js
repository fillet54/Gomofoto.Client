import {inject, bindable} from 'aurelia-framework';
import {DataService} from '../services/dataservice';

@inject(DataService)
export class Gallery {
   @bindable user;

   constructor(dataservice) {
      this.dataservice = dataservice;
      this.isLoading = true;
   }

   attached() {
      this.isLoading = true;
      this.dataservice.loadAlbums(this.user)
         .then(this.isLoading = false);
   }
}


