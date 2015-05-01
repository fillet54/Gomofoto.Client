import {inject} from 'aurelia-framework';
import {Router, Redirect} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import {LogManager} from 'aurelia-framework';
import {Session} from './session';
import {UserNav} from './user-nav';

LogManager.setLevel(LogManager.levels.debug);

@inject(Router, UserNav)
export class App {
  constructor(router, usernav) {
    this.usernav = usernav;
    this.router = router;
    this.router.configure(config => {
      config.title = 'Aurelia';
      config.addPipelineStep('authorize', AuthorizeStep);
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
        { route: 'flickr',        moduleId: './flickr',       nav: true },
        { route: 'gomofoto',      moduleId: './gomofoto',     nav: true, auth: true},
        { route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' },
        { route: 'login',         moduleId: './login',        nav: false }
      ]);
    });
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
        var myred = new Redirect('login');
        return next.cancel(new Redirect('login'));
      }
    }
    return next();
  }
}

