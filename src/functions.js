import {BASE_DELIMITER, REGEX, ERROR_MESSAGE} from "./constants"
import {buildRegexMatchDelimiter, buildRegexOutsideDelimiter} from "./utils"

export function calculateSumFromString (userInput) {
    const {customPart, targetPart} = parseInput(userInput);
    const validatedCustomDelimiters = validateCustomDelimiter(customPart);
    const integratedDelimiter = integrateDelimiter(validatedCustomDelimiters);
    const validatedTargetString = validateTargetString(targetPart, integratedDelimiter);
    const splittedString = splitStringWithDelimiters(integratedDelimiter, validatedTargetString);
    return sumStringArray(splittedString)
} 

const validateCustomDelimiter = (customPart) => {
    // 커스텀 구분자 정의부가 매칭되지 않았다면 바로 반환
    if(!(customPart.start && customPart.end)) return null;
    // 커스텀 구분자가 공란이면 에러
    if(!customPart.delimiters) throw new Error(ERROR_MESSAGE.CUSTOM_EMPTY);
    // 숫자가 구분자로 사용됐을 때 에러
    if(REGEX.CHECK_NUMBER.test(customPart.delimiters)) throw new Error(ERROR_MESSAGE.CUSTOM_USE_NUMBER);

    return customPart.delimiters;
}

const validateTargetString = (target, delimiters) => {
    const regexOutsideDelimiter = buildRegexOutsideDelimiter(delimiters);
    // 타겟 문자열부가 공백인지 검증
    if( !target ) throw new Error(ERROR_MESSAGE.TARGET_EMPTY);
    // 타겟 문자열 부에 숫자가 없을 경우 에러
    if(!REGEX.CHECK_NUMBER.test(target)) throw new Error(ERROR_MESSAGE.TARGET_NONE_NUMBER);
    // 타겟 문자열 부에 등록된 구분자와 숫자 외에 다른 문자가 있을 경우 에러
    if(regexOutsideDelimiter.test(target)) throw new Error(ERROR_MESSAGE.OUTSIDE_DELIMITER);

    return target;
}

// 구분자 통합
const integrateDelimiter = (customDelimiters) => {
    const integratedDelimiters = new Set(BASE_DELIMITER)
    if(customDelimiters){
        [...customDelimiters].forEach((v) => integratedDelimiters.add(v));
    }
    return integratedDelimiters;
}
const parseInput = (userInput) => {
    const [, customStart, customDelimiters, customEnd, targetString] = REGEX.PARSING_STRING.exec(userInput);
    return {
        customPart: {
            start: customStart,
            delimiters: customDelimiters,
            end: customEnd,
        },
        targetPart: targetString,
    }
}

const splitStringWithDelimiters = (delimiters, targetString) => {
    const regexMatchDelimiter = buildRegexMatchDelimiter(delimiters);
    return targetString.split(regexMatchDelimiter);
}
const sumStringArray = (array) => {
    const sumResult = array.reduce((acc, cur) => {
        if(cur === '') cur = '0';
        return acc + Number(cur);
    }, 0);
    return sumResult;
}