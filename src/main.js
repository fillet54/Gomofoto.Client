
export function configure(aurelia) {
   aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-breeze');

  aurelia.start().then(a => a.setRoot());
}
