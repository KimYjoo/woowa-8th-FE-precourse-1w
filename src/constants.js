export const INPUT_MESSAGE = '덧셈할 문자열을 입력해 주세요.\n';
export const BASE_DELIMITER = new Set([",", ":"]);
export const REGEX = {
    CHECK_NUMBER : new RegExp('\\d'),
    PARSING_STRING : new RegExp('^(?:(\/\/)(.*)?(\\\\n))?(.*)?'),
}
export const ERROR_MESSAGE = {
    INPUT_EMPTY : '[ERROR] 입력이 없습니다.',
    CUSTOM_EMPTY : '[ERROR] 커스텀 구분자가 공란입니다.',
    CUSTOM_USE_NUMBER : '[ERROR] 커스텀 구분자로 숫자를 등록할 수 없습니다.',
    TARGET_EMPTY : '[ERROR] 타겟 문자열이 공란입니다.',
    TARGET_NONE_NUMBER : '[ERROR] 타겟 문자열에 숫자가 없습니다.',
    OUTSIDE_DELIMITER : '[ERROR] 등록된 구분자 외의 문자가 사용되었습니다.'
  }