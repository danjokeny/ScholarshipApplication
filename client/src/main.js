import environment from './environment';
import regeneratorRuntime from 'regenerator-runtime';  // supports async-await
window.regeneratorRuntime = regeneratorRuntime;        // supports async-await

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot());
}
