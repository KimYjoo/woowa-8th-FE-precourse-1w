import { Console } from "@woowacourse/mission-utils";

const INPUT_MESSAGE = '덧셈할 문자열을 입력해 주세요.\n';

const BASE_DELIMITER = new Set([",", ":"]);

const REGEX = {
  CHECK_NUMBER : new RegExp('\\d'),
  PARSING_STRING : new RegExp('^(?:(\/\/)(.*)?(\\\\n))?(.*)?'),

}

const ERROR_MESSAGE = {
  INPUT_EMPTY : '[ERROR] 입력이 없습니다.',
  CUSTOM_EMPTY : '[ERROR] 커스텀 구분자가 공란입니다.',
  CUSTOM_USE_NUMBER : '[ERROR] 커스텀 구분자로 숫자를 등록할 수 없습니다.',
  TARGET_EMPTY : '[ERROR] 타겟 문자열이 공란입니다.',
  TARGET_NONE_NUMBER : '[ERROR] 타겟 문자열에 숫자가 없습니다.',
  OUTSIDE_DELIMITER : '[ERROR] 등록된 구분자 외의 문자가 사용되었습니다.'
}

const getUserInput = async () => {
  // 사용자 입력
  const input = await Console.readLineAsync(INPUT_MESSAGE);
  // 입력이 공백인지 검증
  if( !input ) throw new Error(ERROR_MESSAGE.INPUT_EMPTY);
  return input
}
const verifyCustomDelimiter = (customStart, custom, customEnd) => {
  // 커스텀 구분자 정의부가 매칭되지 않았다면 바로 반환
  if(!(customStart && customEnd)) return null;
  // 커스텀 구분자가 공란이면 에러
  if(!custom) throw new Error(ERROR_MESSAGE.CUSTOM_EMPTY);
  // 숫자가 구분자로 사용됐을 때 에러
  if(REGEX.CHECK_NUMBER.test(custom)) throw new Error(ERROR_MESSAGE.CUSTOM_USE_NUMBER);

  return custom;
}
// 구분자 통합
const integrateDelimiter = (currList) => {
  const accSet = new Set(BASE_DELIMITER)
  if(currList){
    [...currList].forEach((v) => accSet.add(v));
  }
  return accSet;
}
const verifyTargetString = (target, delimiters) => {
  const regexOutsideDelimiter = new RegExp(`[^${Array.from(delimiters).join('')}\\d]`);
  // 타겟 문자열부가 공백인지 검증
  if( !target ) throw new Error(ERROR_MESSAGE.TARGET_EMPTY);
  // 타겟 문자열 부에 숫자가 없을 경우 에러
  if(!REGEX.CHECK_NUMBER.test(target)) throw new Error(ERROR_MESSAGE.TARGET_NONE_NUMBER);
  // 타겟 문자열 부에 등록된 구분자와 숫자 외에 다른 문자가 있을 경우 에러
  if(regexOutsideDelimiter.test(target)) throw new Error(ERROR_MESSAGE.OUTSIDE_DELIMITER);

  return target;
}

// 커스텀 구분자와 타겟 문자열을 추출
const parsingDelimiterAndTarget = (userInput) => {
  const [, customStart, customDelimiters, customEnd, targetString] = REGEX.PARSING_STRING.exec(userInput);
  const verifiedCustomDelimiters = verifyCustomDelimiter(customStart, customDelimiters, customEnd);
  const integratedDelimiter = integrateDelimiter(verifiedCustomDelimiters);
  const verifiedTargetString = verifyTargetString(targetString, integratedDelimiter);

  return [integratedDelimiter, verifiedTargetString];
}

const getSumResult = (delimiters, targetString) => {
  const regexMatchDelimiter = new RegExp(`[${Array.from(delimiters).join('')}]`);
  const delimitedStringArray = targetString.split(regexMatchDelimiter);
  const sumResult = delimitedStringArray.reduce((acc, cur) => {
    if(cur === '') cur = '0';
    return acc + Number(cur);
  }, 0);
  return sumResult
}

const printResult = (result) => {
  Console.print(`결과 : ${result}`);
}

class App {
  async run() {
    try{
      const userInput = await getUserInput();
      const [delimiters, targetString] = parsingDelimiterAndTarget(userInput);
      const result = getSumResult(delimiters, targetString)
      //결과 출력
      printResult(result);
    }
    catch(e) {
      Console.print(e.message);
      throw(e);
    }
  }
}

export default App;
