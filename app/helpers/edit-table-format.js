import { helper } from '@ember/component/helper';
import Moment from 'moment';
import Numeral from 'numeral';

export function editTableFormat([value, valueType, valueFormat]) {
  let formattedValue = value;
  let format;
  let valueArray;
  let i;

  //will add formats here as need arises for more formatting
  if (valueFormat) {
    switch(valueType) {
      case "date":
        formattedValue = Moment(value).format(valueFormat); //https://momentjs.com/
        break;
      case "number":
        formattedValue = Numeral(value).format(valueFormat); //http://numeraljs.com/
        break;
      case "text":
        format = valueFormat.split("::");

        if(format[0] === "custom") {
          //gunna do custom stuff here... vOv
          valueArray = value.split('');
          formattedValue = format[1];
          for (i = 0; i<valueArray.length; i++) {
             formattedValue = formattedValue.replace('%', valueArray[i]);
          }
        } else {
          //can add something here if needed.  maybe something with https://www.npmjs.com/package/sprintf-js
        }
        break;
      default:
        break;
    }
  }

  return formattedValue;
}

export default helper(editTableFormat);
