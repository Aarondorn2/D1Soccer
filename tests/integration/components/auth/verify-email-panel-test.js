import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('auth/verify-email-panel', 'Integration | Component | auth/verify email panel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{auth/verify-email-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#auth/verify-email-panel}}
      template block text
    {{/auth/verify-email-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
