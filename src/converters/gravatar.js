import {md5} from "../utils/md5";

export class GravatarValueConverter {
   toView(value, size) {
      return `http://www.gravatar.com/avatar/${value}?s=${size}`;
   }
}
