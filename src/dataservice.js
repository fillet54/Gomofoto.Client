import {inject} from 'aurelia-framework';
import breeze from 'breeze';
import saveQueuing from 'breeze-client-labs/breeze.savequeuing';
import {HttpClient} from 'aurelia-http-client';
import {LogManager} from 'aurelia-framework';
import {Configuration} from './configuration';

var logger = LogManager.getLogger('DataService');

@inject(Configuration)
export class DataService {
   constructor(configuration) {
      var serviceName = configuration.gomofotoServiceEndpoint;

      this.httpClient = new HttpClient();
      this.httpClient.configure(builder => builder.withBaseUri(serviceName));

      this.manager = new breeze.EntityManager(serviceName);
      this.manager.enableSaveQueuing(true);
   }

   getUserByUsername(username) {
      logger.info("Getting user " + username + ".");
      var query = breeze.EntityQuery
         .from("Users")
         .where("Username", "equals", username);
      return this.manager.executeQuery(query);
   } 
   
   getAllUsers() {
     logger.info("Getting All Users.");

     var query = breeze.EntityQuery
                 .from("Users")
                 .expand('Albums');
      return this.manager.executeQuery(query);
   } 

   getAlbumsForUser(user) {
     logger.info("Getting all albums for " + user.FirstName + " " + user.LastName + ".");
     var query = breeze.EntityQuery
                 .from("Albums")
                 .where("UserId", "equals", user.Id);
      var albums = this.manager.executeQuery(query);
      logger.info("Found " + albums.length + " albums.");
      return albums;
   }
   
   getPhotosForAlbum(album) {
     logger.info("Getting all photos for " + album.Name + ".");
      var query = breeze.EntityQuery
         .from("Photos")
         .where("AlbumId", "equals", album.Id);
               
      return this.manager.executeQuery(query);
   }
}
