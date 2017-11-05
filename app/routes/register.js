import Ember from 'ember';

export default Ember.Route.extend({
  email: "",
  password: "",
  isValidEmail: Ember.computed.match('email', /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), //W3C standard email regex
  isValidPasswordLength: Ember.computed.match('password', /^.{6,}$/),
  isValidPasswordCasing: Ember.computed.match('password', /(?=.*[a-z])(?=.*[A-Z])/),
  isValidPasswordAlphaNumeric: Ember.computed.match('password', /\d/),

  isValidPassword: Ember.computed.and('isValidPasswordLength', 'isValidPasswordCasing', 'isValidPasswordAlphaNumeric'),
  isValidForm: Ember.computed.and('isValidPassword', 'isValidEmail'),
  isNotValidForm: Ember.computed.not('isValidForm'),
});
