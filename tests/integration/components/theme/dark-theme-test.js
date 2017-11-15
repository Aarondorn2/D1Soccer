import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('theme/dark-theme', 'Integration | Component | theme/dark theme', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{theme/dark-theme}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#theme/dark-theme}}
      template block text
    {{/theme/dark-theme}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
