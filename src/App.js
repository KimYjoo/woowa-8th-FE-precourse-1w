import { Console } from "@woowacourse/mission-utils";
class App {
  async run() {
    

    try{
      const baseDelimiters = new Set([",", ":"]);
      // 사용자 입력
      const userInput = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

      // 입력이 공백인지 검증
      if( !userInput ) throw new Error('[ERROR]');
      
      // 문자열에 숫자가 포함되었는지 검증
      const regexCheckNumber = new RegExp('\\d');
      // 커스텀 구분자 정의부가 있는지 검증
      const regexCheckCustomRegister = new RegExp('^(\/\/)(?:.*)?(\\\\n)');
      
      // 커스텀 구분자와 일반 문자열을 추출
      const regexParseCustomDelimiter = new RegExp('^(?:(?:\/\/)(.*)?(?:\\\\n))?(?:.*)?');
      const regexParseTargetString = new RegExp('^(?:(?:\/\/)(?:.*)?(?:\\\\n))?(.*)?');
      const [, customDelimiters] = regexParseCustomDelimiter.exec(userInput);
      const [, targetString] = regexParseTargetString.exec(userInput);

      const getCustomDelimiter = (set, str) => {
        // 문자열에 커스텀 구분자 정의부가 없다면 바로 반환
        if(!regexCheckCustomRegister.test(str)) return set;
        // 정의부가 있지만 내용이 없을 때 에러 
        if(!customDelimiters) throw new Error('[ERROR]');
        // 숫자가 구분자로 사용됐을 때 에러
        if(regexCheckNumber.test(customDelimiters)) throw new Error('[ERROR]');
        // 커스텀 구분자를 전체 구분자 집합에 추가
        [...customDelimiters].forEach((v) => set.add(v));
        return set;
      }
      const allOfDelimiter = getCustomDelimiter(baseDelimiters, userInput);

      // 일반 문자열부가 공백인지 검증
      if( !targetString ) throw new Error('[ERROR]');
      // 일반 문자열부를 등록된 구분자로 분리
      const regexMatchDelimiter = new RegExp(`[${Array.from(allOfDelimiter).join('')}]`);
      const regexOutsideDelimiter = new RegExp(`[^${Array.from(allOfDelimiter).join('')}\\d]`);
      const delimitedStringArray = targetString.split(regexMatchDelimiter);

      // 타겟 문자열 부에 등록된 구분자와 숫자 외에 다른 문자가 있을 경우 에러
      if(regexOutsideDelimiter.test(targetString)) throw new Error('[ERROR]');
      // 타겟 문자열 부에 숫자가 없을 경우 에러
      if(!regexCheckNumber.test(targetString)) throw new Error('[ERROR]');
      // 배열의 요소들을 숫자로 변환하여 모두 더한 값을 저장
      const sumResult = delimitedStringArray.reduce((acc, cur) => (acc + Number(cur)), 0);

      //결과 출력
      Console.print(`결과 : ${sumResult}`);
    }
    catch(e) {
      Console.print(e);
      throw(e);
    }
  }
}

export default App;
