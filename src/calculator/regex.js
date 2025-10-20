export const CHECK_NUMBER = new RegExp('\\d');
export const PARSING_STRING = new RegExp('^(?:(\/\/)(.*)?(\\\\n))?(.*)?');
export const NEED_ESCAPE_CHAR = /[.*+?^${}()|[\]\\-]/g;