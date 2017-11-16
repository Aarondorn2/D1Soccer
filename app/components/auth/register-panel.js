import Ember from 'ember';
const {Logger} = Ember;

//TODO add fields for gender and preferred position. switch to model injection via route? Move validation to model?
export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  router: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  //user fields
  firstName: "",
  lastName: "",
  dob: "",
  phone: "",
  shirtSize: "None",
  emergencyContact: "",
  emergencyContactPhone: "",

  //email fields
  email: "",
  password: "",
  passwordConfirm: "",

  //email fields validation
  isValidEmail: Ember.computed.match('email', /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/), //W3C email regex https://www.w3resource.com/javascript/form/email-validation.php
  isValidPasswordLength: Ember.computed.match('password', /^.{6,}$/),
  isValidPasswordCasing: Ember.computed.match('password', /(?=.*[a-z])(?=.*[A-Z])/),
  isValidPasswordAlphaNumeric: Ember.computed.match('password', /\d/),
  isValidPasswordMatch: Ember.computed('password','passwordConfirm', function() {
    return this.get('password') && (this.get('password') === this.get('passwordConfirm'));
  }),
  isValidPassword: Ember.computed.and('isValidPasswordLength', 'isValidPasswordCasing', 'isValidPasswordAlphaNumeric', 'isValidPasswordMatch'),

  //form validation
  isValidForm: Ember.computed(
              'firstName',
              'lastName',
              'dob',
              'emergencyContact',
              'emergencyContactPhone',
              'isValidEmail',
              'isValidPassword',
              function() {
                let requiredFields =
                  this.get('firstName') &&
                  this.get('lastName') &&
                  this.get('dob').length === 10 && //8 numbers + 2 '/' = 10
                  this.get('emergencyContact') &&
                  this.get('emergencyContactPhone').length === 10;
                let password = false;

                if(this.get('session').get('isAuthenticated')) { //already authed - don't need email/password
                  password = true;
                } else {
                  password = this.get('isValidEmail') && this.get('isValidPassword');
                }

                return requiredFields && password;
              }),

  actions: {

      createUser() {
        //debounce button
        Ember.$('#registration-button').attr("disabled", true);
        //load spinner
        Ember.$('.registration-spinner').css('display', 'inline-block');
        //reset errors
        this.set('isEmailInUse', false);
        this.set('isUnknownError', false);


        let session = this.get('session');
        let isAuthenticated = session.get('isAuthenticated');
        let email = "";

        if(isAuthenticated) {
          email = session.get('currentUser').providerData[0].email; //use email from session, not form (if available)
        } else {
          email = this.get('email');
        }

        //create user
        let user = this.get('store').createRecord('user', {
                firstName: this.get('firstName'),
                lastName: this.get('lastName'),
                dob: new Date(this.get('dob')),
                phone: this.get('phone'),
                shirtSize: this.get('shirtSize'),
                emergencyContact: this.get('emergencyContact'),
                emergencyContactPhone: this.get('emergencyContactPhone'),
                email: email
              });


        //create email/password authentication
        if (!isAuthenticated) {
          this.get('firebaseApp').auth().createUserWithEmailAndPassword(
              this.get('email'),
              this.get('password')
          ).then(
            ()=>{
              //update session
              session.fetch()
                .then(() => {
                    //save user
                    user.save().then(() => {
                      //send verification email
                      let fUser = this.get('firebaseApp').auth().currentUser;
                      fUser.sendEmailVerification()
                        .then(function() {
                          //transition
                          this.get('router').transitionTo('secure.dashboard');
                        }.bind(this))
                        .catch(function(error) {
                          //log and continue - they can resend...
                          Logger.error(error);
                          this.get('router').transitionTo('secure.dashboard');
                        });
                    });
                })
                .catch((error) => {
                  Logger.error(error); //couldn't update session?
                })
          }).catch((error) =>{
              if (error.code == 'auth/email-already-in-use') {
                this.set('isEmailInUse', true);
              } else {
                this.set('isUnknownError', true);
                Logger.error(error.message);
              }
              //reset spinner and button
              Ember.$('#registration-button').attr("disabled", false);
              Ember.$('.registration-spinner').css('display', 'none');

              //jump to top of page
              window.scrollTo(0,0);
          });
        } else { //already authenticated, just need to create user and add to session
            user.save().then(() => {
              //transition
              this.get('router').transitionTo('secure.dashboard');
            });
        }

      } // createUser()
  },
  init() {
    this._super(...arguments);

    let currentUser = this.get('session').get('currentUser');
    let userEmail = "";

    if(currentUser) { //should always have a session here, so currentUser should always be defined...
      userEmail = currentUser.providerData[0].email;
    }
    this.set('email', userEmail);
  }

});
