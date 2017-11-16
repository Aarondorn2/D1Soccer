import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('league/information/content-league-player', 'Integration | Component | league/information/content league player', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{league/information/content-league-player}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#league/information/content-league-player}}
      template block text
    {{/league/information/content-league-player}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
