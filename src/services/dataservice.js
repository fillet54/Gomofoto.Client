import {inject, LogManager} from 'aurelia-framework';
import breeze from 'breeze';
import saveQueuing from 'breeze-client-labs/breeze.savequeuing';
import {Configuration} from '../configuration';

var logger = LogManager.getLogger('DataService');

@inject(Configuration)
export class DataService {
   constructor(configuration) {
      var serviceName = configuration.gomofotoServiceEndpoint;

      this.manager = new breeze.EntityManager(serviceName);
      this.manager.enableSaveQueuing(true);
   }

   getUserById(id) {
      logger.info(`Getting user for id ${id}`);
      var query = breeze.EntityQuery
         .from("Users")
         .where("Id", "equals", id);
      return this.manager.executeQuery(query);
   }

   getUserByIdWithAlbums(id) {
      logger.info(`Getting user for id ${id}`);
      var query = breeze.EntityQuery
         .from("Users")
         .where("Id", "equals", id)
         .expand('Albums');
      return this.manager.executeQuery(query);
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

   getAlbumsForUser(id) {
     logger.info('Getting all albums for user ${username}');
     var query = breeze.EntityQuery
                 .from("Albums")
                 .where("UserId", "equals", id);
      return this.manager.executeQuery(query);
   }
   
   getPhotosForAlbum(album) {
     logger.info("Getting all photos for " + album.Name + ".");
      var query = breeze.EntityQuery
         .from("Photos")
         .where("AlbumId", "equals", album.Id);
               
      return this.manager.executeQuery(query);
   }
}
