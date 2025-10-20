import { BASE_DELIMITER } from "../share/constants.js";
import { arrayToString } from "../share/utils.js";

export const integrateDelimiter = (customDelimiters) => {
    const integratedDelimiters = new Set(BASE_DELIMITER)
    if(customDelimiters){
        [...customDelimiters].forEach((v) => integratedDelimiters.add(v));
    }
    return integratedDelimiters;
}

export const buildRegexOutsideDelimiter = (delimiters) => {
    const delimiterString = arrayToString(delimiters);
    return new RegExp(`[^${delimiterString}\\d]`);
}

export const buildRegexMatchDelimiter = (delimiters) => {
    const delimiterString = arrayToString(delimiters);
    return new RegExp(`[${delimiterString}]`);
}