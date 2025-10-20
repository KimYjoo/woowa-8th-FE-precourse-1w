import {PARSING_STRING} from "./regex.js"

export const parseInput = (userInput) => {
    const [, customStart, customDelimiters, customEnd, targetString] = PARSING_STRING.exec(userInput);
    return {
        customPart: {
            start: customStart,
            delimiters: customDelimiters,
            end: customEnd,
        },
        targetPart: targetString,
    }
}