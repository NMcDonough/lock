import moment from 'moment';
import _ from 'lodash';


export function checkAuthorization(user) {
  if (_.includes(user.data.role,'GSR_REQUESTOR')) {
    return true;
  }
  return false;
}

export function scrollableStyles(height) {
  const styles = {
      float: 'left',
      textAlign:"left",
      height: height,
      overflow: 'auto'
  }
  return styles;
}

function checkIfNaN(fn, str) {
  if (isNaN(str)) {
    return "N/A"
  }
  return fn(str);
}

export function cast(str, format) {
    if (str === "" ) {
       return "N/A";
    }
    switch(format) {
      case 'percentage':
        return checkIfNaN(convertToPercentage, str)
        break;
      case 'date':
        return convertToDate(str);
        break;
      case 'dollarAmount':
        return convertToDollars(str);
        break;
      case 'fixedDecimal':
        return convertToDecimal(str);
        break;
      case 'multiplier':
        return convertToMultiplier(str);
        break;
      case 'wholeNumber':
        return checkIfNaN(convertToWholeNumber, str);
        break;
      case 'sentenceCase':
        return convertToSentenceCase(str);
        break;
      case 'totalRevenue':
        return checkIfNaN(convertToPercentageTotalRevenue, str);
        break;
      default:
        return str;
    }
    return str;
}

export function convertToPercentage(val) {
  return Math.round(val).toFixed(0) + "%";
}

export function convertToPercentageTotalRevenue(val) {
  return `${val.toFixed(2)*100}%`;
}
export function convertToDate(date) {
  return moment(date).format('MM/DD/YY');
}

export function convertToDollars(val) {
  return `$${Math.round(val).toLocaleString()}`;
}

export function convertToDecimal(val) {
  return val.toFixed(1);
}

export function convertToMultiplier(val) {
  return `${parseFloat(val).toFixed(2)}x`
}

export function convertToWholeNumber(val) {
  return `${Math.round(val)}`
}

export function convertToTitleCase(str) {
  return _.startCase(_.toLower(str));
}

export function convertToSentenceCase(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}
