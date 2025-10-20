import { buildRegexMatchDelimiter } from "./delimiter.js";

export const splitStringWithDelimiters = (delimiters, targetString) => {
    const regexMatchDelimiter = buildRegexMatchDelimiter(delimiters);
    return targetString.split(regexMatchDelimiter);
}