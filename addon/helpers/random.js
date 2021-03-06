import Ember from 'ember';

const { Helper } = Ember;
const { isArray } = Array;
const { min, max } = Math;

// @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed#max(0, min(MAX_DECIMALS, decimals))));
const MAX_DECIMALS = 20;

// 💡 Using Number.toFixed, we'll get rounding for free alongside
// decimal precision. We'll default to whole-number rounding simply
// by defaulting `decimals` to 0
const DEFAULT_OPTS = {
  decimals: 0
};

export function random(params, { decimals } = DEFAULT_OPTS) {
  // no positional args, but only an options hash from named args
  if (typeof params === 'object' && !isArray(params)) {
    decimals = typeof params.decimals !== 'undefined' ? params.decimals : DEFAULT_OPTS.decimals;

    return +(Math.random().toFixed(max(0, min(MAX_DECIMALS, decimals))));
  }

  // one positional arg: treat it as an upper bound
  if (params && params.length === 1) {
    let [upperBound] = params;

    return +((Math.random() * upperBound).toFixed(max(0, min(MAX_DECIMALS, decimals))));
  }

  // two positional args: use them to derive upper and lower bounds
  if (params && params.length === 2) {
    let [lowerBound, upperBound] = params;

    // for convinience, swap if a higher number is accidentally passed first
    if (upperBound < lowerBound) {
      [lowerBound, upperBound] = [upperBound, lowerBound];
    }
    return +((lowerBound + (Math.random() * (upperBound - lowerBound))).toFixed(max(0, min(MAX_DECIMALS, decimals))));
  }

  // no positional or named args: just return Math.random() w/ default decimal precision
  return +(Math.random().toFixed(max(0, min(MAX_DECIMALS, decimals))));
}

export default Helper.helper(random);
