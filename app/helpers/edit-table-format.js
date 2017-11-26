import { helper } from '@ember/component/helper';
import Moment from 'moment';
import Numeral from 'numeral';

export function editTableFormat([value, valueType, valueFormat]) {
  let formattedValue = value;

  //will add formats here as need arises for more formatting
  if (valueFormat) {
    switch(valueType) {
      case "date":
        formattedValue = Moment(value).format(valueFormat); //https://momentjs.com/
        break;
      case "number":
        formattedValue = Numeral(value).format(valueFormat); //http://numeraljs.com/
        break;
      default:
        break;
    }
  }

  return formattedValue;
}

export default helper(editTableFormat);
