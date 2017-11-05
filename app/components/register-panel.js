import Ember from 'ember';

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),

  reasonNoUser: Ember.computed('reason', function() {
    return this.get('reason') === "noUser";
  }),

  //fields
  email: "",
  password: "",
  //TODO other fields and UI

  //validation
  isEmailProvided: false,
  isValidEmail: Ember.computed.match('email', /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), //W3C standard email regex
  isValidPasswordLength: Ember.computed.match('password', /^.{6,}$/),
  isValidPasswordCasing: Ember.computed.match('password', /(?=.*[a-z])(?=.*[A-Z])/),
  isValidPasswordAlphaNumeric: Ember.computed.match('password', /\d/),

  isValidPassword: Ember.computed.and('isValidPasswordLength', 'isValidPasswordCasing', 'isValidPasswordAlphaNumeric'),
  isValidForm: Ember.computed.and('isValidPassword', 'isValidEmail'),
  isNotValidForm: Ember.computed.not('isValidForm'),

  actions: {

      createUser() {
        let email = this.get('email');
        let pass = this.get('password');
        const auth = this.get('firebaseApp').auth();
        auth.createUserWithEmailAndPassword(email, pass).then((userResponse) => {
          const user = this.store.createRecord('user', {
            id: userResponse.uid,
            email: userResponse.email
          });
          return user.save();
        });
      }
  },
  init() {
    this._super(...arguments);

    this.set('email', this.get('session').content.currentUser.email);
    this.set('isEmailProvided', this.get('email') != "");
  }

});
