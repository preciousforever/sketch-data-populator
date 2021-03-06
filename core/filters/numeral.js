/**
 * Number format filter
 */

import { has, trim } from 'lodash';
import numeral from 'numeral'
import "numeral/locales/";

export const name = 'numeral'
export const alias = 'numeral'

/**
 * Apply various numerical and locale formats
 *
 * @param {String} string
 * @param {String} param
 * @returns {String}
 */

export function apply(string, param) {

  if (!string) return

  //catch non numerical subsitutions and escape.
  if (isNaN(string) === true) return string;
  // catch empty paramters
  if (!param) return string


  let matches
  let indexStart = -1;
  let indexEnd = -1;

  //Seperate out locales within a < > 
  const regex = /\<.+?\>/;
  if(param) matches = param.match(regex);


  let localeString = "none"; //default
  let formatString = "0.0"; //default
  let hasLocale = false;

  //default to english
  numeral.locale('en');

  if (matches){
    localeString = String(matches).slice(1,-1);
    indexStart = param.indexOf('<');
    indexEnd = param.indexOf('>');
    param = param.slice(0, indexStart) + param.slice(indexEnd+1);
  
    // check if we have a locale string and if so, set locale.
    if( localeString in numeral.locales )
    {
      hasLocale = true;
      numeral.locale(localeString);
    }
  }


  //rejoin and trim string:
  formatString = param.trim();

  // if we have no params, we can default to '0,0' 
  let numFormat = formatString ? String(formatString) : '0,0' 
  
  //format and return the value
  return numeral(string).format(numFormat);
}
