export class ThumbnailAlbum {

   constructor(albumModel) {
      this.albumModel = albumModel;
   }

   get id() {
      return this.albumModel.Id;
   }

   get name() {
      return this.albumModel.Name;
   }

   get description() {
      return this.albumModel.Description;
   }

   getThumbnailUrl(x, y) {
      return `http://placehold.it/${x}x${y}`
   }
}
