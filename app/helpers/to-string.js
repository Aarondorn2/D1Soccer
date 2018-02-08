import { helper } from '@ember/component/helper';

export function toString([value]) {
  return ( value === void 0 ) ? 'undefined' : value.toString();
}

export default helper(toString);
