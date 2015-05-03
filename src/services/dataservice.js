import {LogManager} from 'aurelia-framework';
import breeze from 'breeze';
import saveQueuing from 'breeze-client-labs/breeze.savequeuing';
import {config} from '../configuration';
import {extendBreezeTypes} from './data-init';

var logger = LogManager.getLogger('DataService');

export class DataService {
   constructor() {
      breeze.NamingConvention.camelCase.setAsDefault();
      this.manager = extendBreezeTypes(config.gomofotoServiceEndpoint);
      this.manager.enableSaveQueuing(true);
   }

   getUserById(id) {
      logger.info(`Getting user for id ${id}`);
      var query = breeze.EntityQuery
         .from("Users")
         .where("id", "equals", id);
      return this.manager.executeQuery(query);
   }

   getUserByIdWithAlbums(id) {
      logger.info(`Getting user for id ${id}`);
      var query = breeze.EntityQuery
         .from("Users")
         .where("id", "equals", id)
         .expand('albums');
      return this.manager.executeQuery(query);
   }


   getUserByUsername(username) {
      logger.info("Getting user " + username + ".");
      var query = breeze.EntityQuery
         .from("Users")
         .where("username", "equals", username);
      return this.manager.executeQuery(query);
   } 
   
   getAllUsers() {
     logger.info("Getting All Users.");

     var query = breeze.EntityQuery
                 .from("Users")
                 .expand('albums');
      return this.manager.executeQuery(query);
   } 

   loadAlbums(user) {
      var query = breeze.EntityQuery
                     .fromEntityNavigation(user, 'albums')
      return this.manager.executeQuery(query);
   }
   
   getAlbumsForUser(id) {
     logger.info('Getting all albums for user ${id}');
     var query = breeze.EntityQuery
                 .from("Albums")
                 .where("userId", "equals", id);
      return this.manager.executeQuery(query);
   }
   
   getPhotosForAlbum(album) {
     logger.info("Getting all photos for " + album.Name + ".");
      var query = breeze.EntityQuery
         .from("Photos")
         .where("albumId", "equals", album.id);
               
      return this.manager.executeQuery(query);
   }
}
