import {gravatarUrl} from '../utils/gravatar';
import breeze from 'breeze';

var User = function() {
}

Object.defineProperty(User.prototype, 'fullName', {
   enumerable: true,
   configurable: true,
   get: function() { return `${this.firstName} ${this.lastName}`; }
});

User.prototype.getAvatarUrl = function(x, y) {
   var emailAddress = this.emailAddress;
   return gravatarUrl(emailAddress, x);
};

var Album = function () {
};

Album.prototype.getThumbnailUrl = function(x, y) {
   return `http://placehold.it/${x}x${y}`;
}

export function extendBreezeTypes(endpoint) {

   var manager = new breeze.EntityManager(endpoint);
   var store = manager.metadataStore;
   store.registerEntityTypeCtor('User', User);
   store.registerEntityTypeCtor('Album', Album);
   return manager;
}

