import { CHECK_NUMBER } from "./regex.js"
import { ERROR_MESSAGE } from "../shared/constants.js"
import { buildRegexOutsideDelimiter } from "./delimiter.js"

export const validateCustomDelimiter = (customPart) => {
    if(!(customPart.start && customPart.end)) return null;
    if(!customPart.delimiters) throw new Error(ERROR_MESSAGE.CUSTOM_EMPTY);
    if(CHECK_NUMBER.test(customPart.delimiters)) throw new Error(ERROR_MESSAGE.CUSTOM_USE_NUMBER);

    return customPart.delimiters;
}

export const validateTargetString = (target, delimiters) => {
    const regexOutsideDelimiter = buildRegexOutsideDelimiter(delimiters);
    if( !target ) throw new Error(ERROR_MESSAGE.TARGET_EMPTY);
    if(!CHECK_NUMBER.test(target)) throw new Error(ERROR_MESSAGE.TARGET_NONE_NUMBER);
    if(regexOutsideDelimiter.test(target)) throw new Error(ERROR_MESSAGE.OUTSIDE_DELIMITER);

    return target;
}