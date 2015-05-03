import {md5} from './md5';

export function gravatarHash(email) {
   return md5(email.trim().toLowerCase());
}

export function gravatarUrl(email, size) {
   var hash = gravatarHash(email);
   return `http://www.gravatar.com/avatar/${hash}?s=${size}`;
}
