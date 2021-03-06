import { mod } from 'dummy/helpers/mod';
import { module, test } from 'qunit';

module('Unit | Helper | mod');

test('modulus works', function(assert) {
  let result = mod([20, 10]);
  assert.equal(result, 0);
});

test('modulus of multiple arguments works', function(assert) {
  let result = mod([10, 7, 2]);
  assert.equal(result, 1);
});
