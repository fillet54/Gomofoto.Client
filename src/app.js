import {inject} from 'aurelia-framework';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import {LogManager} from 'aurelia-framework';
import {Session} from './session';
import {UserNav} from './user-nav';
import {Redirect} from 'aurelia-router';

@inject(UserNav)
export class App {
  constructor(usernav) {
    this.usernav = usernav;
  }
  
  configureRouter(config, router) {
     config.title = 'Aurelia';
     config.addPipelineStep('authorize', AuthorizeStep);
     config.map([
           { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
           { route: 'flickr',        moduleId: './flickr',       nav: true },
           { route: 'gomofoto',      moduleId: './gomofoto',     nav: true, auth: true},
           { route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' },
           { route: 'login',         moduleId: './auth/login',        nav: false },
           { route: 'logout',         moduleId: './auth/logout',        nav: false }
           ]);
     this.router = router;
  }
}

var logger = LogManager.getLogger('AuthorizeStep');
@inject(Session)
class AuthorizeStep {
  constructor(session) {
     this.session = session;
  }

  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      logger.info("Authorizing user");
      var isLoggedIn = this.session.isLoggedIn;
      if (!isLoggedIn) {
        logger.info("Redirecting to login");
        return next.cancel(new Redirect('/login'));
      }
    }
    return next();
  }
}

