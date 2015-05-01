export class Session {
   constructor() {
      this.user = null; 
   }

   get isLoggedIn() {
      return this.user == null ? false : true;
   }
}
