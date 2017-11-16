import Ember from 'ember';
const {Logger} = Ember;

export default Ember.Component.extend({
    firebaseApp: Ember.inject.service(),
    router: Ember.inject.service(),
    session: Ember.inject.service(),
    queryParams: Ember.inject.service('query-params'),
    isCallback: false,
    isSendSuccess: false,
    isUnknownError: false,
    isInvalidCode: false,

    actions: {
      sendVerificationEmail() {
        let user = this.get('firebaseApp').auth().currentUser;

        if(!user) {
          this.get('router').transitionTo('auth.login');
        } else {
          user.sendEmailVerification()
            .then(function() {
              this.set('isSendSuccess', true);
            }.bind(this))
            .catch(function(error) {
              this.set('isUnknownError', true);
              Logger.error(error);
            }.bind(this));
        }

      }
    },

    init() {
      this._super(...arguments);

      //check to see if this is a callback
      let mode = this.get('queryParams').get('mode');
      if (mode && mode === 'verifyEmail') {
          this.set('isCallback', true);

          let oobCode = this.get('queryParams').get('oobCode');
          let auth = this.get('firebaseApp').auth();

          auth.applyActionCode(oobCode)
            .then(() => {
              //email is verified!  send to login if needed, else reload to update session
              if(this.get('session').get('isAuthenticated')) {
                location.reload();
              } else {
                this.get('router').transitionTo('auth.login');
              }

            })
            .catch((error) => {
                if(error.code === "auth/invalid-action-code") {
                  this.set('isInvalidCode', true);
                } else {
                  this.set('isUnknownError', true);
                }
                this.set('isCallback', false);
                Logger.error(error);
            });
      }
    }
});
