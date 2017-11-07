import Ember from 'ember';
import User from "../models/user";

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),

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
  //TODO other fields and UI

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
                  this.get('dob').length === 8 &&
                  this.get('emergencyContact') &&
                  this.get('emergencyContactPhone').length === 10;
                let password = false;

                if(this.get('session').isAuthenticated) {
                  //already authed - don't need email/password
                  password = true;
                } else {
                  password = this.get('isValidEmail') && this.get('isValidPassword');
                }

                return requiredFields && password;
              }),

  actions: {

      createUser() {
        let isAuthenticated = this.get('session').isAuthenticated;
        //create user
        let user = new User();
          user.firstName = this.get('firstName');
          user.lastName = this.get('lastName');
          user.dob = new Date(this.get('dob'));
          user.phone = this.get('phone');
          user.shirtSize = this.get('shirtSize');
          user.emergencyContact = this.get('emergencyContact');
          user.emergencyContactPhone = this.get('emergencyContactPhone');

        if(isAuthenticated) {
          user.email = this.get('session').content.currentUser.email; //use email from session, not form (if available)
        } else {
          user.email= this.get('email');
        }

        this.get('store').createRecord('user', user);

        //create email/password authentication
        if (!isAuthenticated) {

          this.get('firebaseApp').auth.createUserWithEmailAndPassword(
              this.get('email'),
              this.get('password'));
        }
      }
  },
  init() {
    this._super(...arguments);

    let currentUser = this.get('session').content.currentUser;
    let userEmail = "";

    if(currentUser) { //should always have a session here, so currentUser should always be defined...
      userEmail = currentUser.email;
    }
    this.set('email', userEmail);
  }

});
