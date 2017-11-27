import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/bootstrap-select-option', 'Integration | Component | form/bootstrap select option', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form/bootstrap-select-option}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form/bootstrap-select-option}}
      template block text
    {{/form/bootstrap-select-option}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
