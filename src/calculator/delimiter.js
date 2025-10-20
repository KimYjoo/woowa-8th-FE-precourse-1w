import { BASE_DELIMITER } from "../shared/constants.js";
import { arrayToString } from "../shared/utils.js";
import { NEED_ESCAPE_CHAR } from "./regex.js";

export const integrateDelimiter = (customDelimiters) => {
    const integratedDelimiters = new Set(BASE_DELIMITER)
    if(customDelimiters){
        [...customDelimiters].forEach((v) => integratedDelimiters.add(v));
    }
    return integratedDelimiters;
}
const escapeForDelimiters = (s) => (s.replace(NEED_ESCAPE_CHAR, '\\$&'))

export const buildRegexOutsideDelimiter = (delimiters) => {
    const delimiterString = arrayToString(delimiters);
    const escapedDelimiter = escapeForDelimiters(delimiterString);
    return new RegExp(`[^${escapedDelimiter}\\d]`);
}

export const buildRegexMatchDelimiter = (delimiters) => {
    const delimiterString = arrayToString(delimiters);
    const escapedDelimiter = escapeForDelimiters(delimiterString);
    return new RegExp(`[${escapedDelimiter}]`);
}
