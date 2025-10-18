import { Console } from "@woowacourse/mission-utils";
class App {
  async run() {
    

    try{
      const delimiterSet = new Set([",", ":"]);
      // 사용자 입력
      const userInput = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

      // 입력이 공백인지 검증
      if( !userInput ) throw new Error('[ERROR]');
      
      // 문자열에 숫자가 포함되었는지 검증
      const regexCheckNumber = new RegExp('\\d');
      // 커스텀 구분자와 일반 문자열을 추출
      const regexParsingString = new RegExp('^(?:(?:\/\/)(.*)?(?:\\\\n))?(.*)?');
      // 커스텀 구분자 정의부가 있는지 검증
      const regexCheckCustomRegister = new RegExp('^(\/\/)(?:.*)?(\\\\n)');
      const [_, customDelimiters, targetString] = regexParsingString.exec(userInput);
      Console.print(customDelimiters)
      // 커스텀 구분자 정의부가 추출되었는지 확인
      if( customDelimiters ) {
        // 커스텀 구분자에 숫자가 있는지 확인
        if ( regexCheckNumber.test(customDelimiters) ) throw new Error('[ERROR]');
        // 커스텀 구분자를 전체 구분자 집합에 추가
        [...customDelimiters].forEach((v) => delimiterSet.add(v));
      }
      // 커스텀 구분자 정의부가 있지만 내부가 비었을 경우 검증
      else if(regexCheckCustomRegister.test(userInput)){
        throw new Error('[ERROR]');
      }
      
      // 일반 문자열부가 공백인지 검증
      if( !targetString ) throw new Error('[ERROR]');
      // 일반 문자열부를 등록된 구분자로 분리
      const regexMatchDelimiter = new RegExp(`[${Array.from(delimiterSet).join('')}]`);
      const regexOutsideDelimiter = new RegExp(`[^${Array.from(delimiterSet).join('')}\\d]`);
      const delimitedStringArray = targetString.split(regexMatchDelimiter);

      if(regexOutsideDelimiter.test(targetString)) throw new Error('[ERROR]');
      // 배열의 요소들을 숫자로 변환하여 모두 더한 값을 저장
      const sumResult = delimitedStringArray.reduce((acc, cur) => {
        const num = Number(cur);
        // 배열 요소가 숫자로 변환가능한지 검증
        if(Number.isFinite(num)){
          return acc + num;
        }
        else{
          throw new Error('[ERROR]');
        }
      }, 0);

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
