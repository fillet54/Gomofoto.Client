import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework'; 
import {DataService} from './dataservice';
import {LogManager} from 'aurelia-framework';

var logger = LogManager.getLogger('Gomofoto');

@inject(DataService)
export class Gomofoto {
   @bindable heading = 'All Photos';

   constructor(dataservice) {
      this.dataservice = dataservice;
      this.photos = [];
   }

  activate() {
     return this.getPhotos();
  } 

  getPhotos() {
    return this.dataservice.getAllUsers()
      .then(
        users => {
          this.dataservice.getPhotosForAlbum(users.results[0].Albums[0])
             .then(
                photos => {
                   this.photos = photos.results;
                },
                error => logger.error(error.message, "Query failed"));
        },
        error => logger.error(error.message, "Query failed"));
  } 
}
