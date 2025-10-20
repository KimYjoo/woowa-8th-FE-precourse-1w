const ArrayToString = (delimiters) => (Array.from(delimiters).join(''));

export const buildRegexOutsideDelimiter = (delimiters) => {
    const delimiterString = ArrayToString(delimiters);
    return new RegExp(`[^${delimiterString}\\d]`);
}

export const buildRegexMatchDelimiter = (delimiters) => {
    const delimiterString = ArrayToString(delimiters);
    return new RegExp(`[${delimiterString}]`);
}