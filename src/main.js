import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.levels.debug);

export function configure(aurelia) {
   aurelia.use
      //.standardConfiguration()
      .defaultBindingLanguage()
      .defaultResources()
      .router()
      .eventAggregator()
    .developmentLogging()
    .plugin('aurelia-breeze');

  aurelia.start().then(a => a.setRoot());
}
