
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Route.extend({
  intl: service(),
  actions: {
    signin () {
      this.get('session').open('arcgis-oauth-bearer')
        .then((authorization) => {
          debug('AUTH SUCCESS: ', authorization);
          this.transitionTo('index');
        })
        .catch((err)=>{
          debug('AUTH ERROR: ', err);
        });
    },
    signout () {
      this.get('session').close();
    }
  },
  _initSession () {
    return this.get('session').fetch()
      .then(() => {
        debug('User has been automatically logged in... ');
      })
      .catch((/*err*/) => {
        // we want to catch this, otherwise Ember will redirect to an error route!
        debug('No cookie was found, user is anonymous... ');
      });
  },
  beforeModel() {
    debug('ApplicationRoute:beforeModel');
      //set up the interationalization
  this.get('intl').setLocale('en-us');
  // automatically re-hydrate a session
  return this._initSession();
  }
});