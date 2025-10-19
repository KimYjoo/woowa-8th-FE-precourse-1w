import { Console } from "@woowacourse/mission-utils";
class App {
  async run() {
    

    try{
      const getUserInput = async () => {
        // 사용자 입력
        const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
        // 입력이 공백인지 검증
        if( !input ) throw new Error('[ERROR]');
        return input
      }
      const userInput = await getUserInput();

      // 문자열에 숫자가 포함되었는지 검증
      const regexCheckNumber = new RegExp('\\d');
      
      
      // 커스텀 구분자와 타겟 문자열을 추출
      const parsingDelimiterAndTarget = (userInput) => {
        const baseDelimiters = new Set([",", ":"]);
        const regexParsingCustomAndTarget = new RegExp('^((?:\/\/)(?:.*)?(?:\\\\n))?(.*)?');
        const [, customRegisterPart, targetStringPart] = regexParsingCustomAndTarget.exec(userInput);

        const verifyCustomDelimiter = (custom) => {
          // 커스텀 정의부가 없다면 바로 반환
          if(!custom) return null;
          // 커스텀 구분자 정의부가 있는지 검증
          const regexCheckCustomRegister = new RegExp('^(\/\/)(?:.*)?(\\\\n)');
          // 문자열에 커스텀 구분자 정의부가 제대로 정의되어 있지 않다면 바로 반환
          if(!regexCheckCustomRegister.test(custom)) return null;
          // 커스텀 구분자 정의부에서 구분자를 매칭
          const regexExtractCustomDelimiter = new RegExp('^(?:(?:\/\/)(.*)?(?:\\\\n))');
          const [, customDelimiters] = regexExtractCustomDelimiter.exec(custom);

          // 정의부가 있지만 내용이 없을 때 에러 
          if(!regexExtractCustomDelimiter.test(custom)) throw new Error('[ERROR]');
          // 숫자가 구분자로 사용됐을 때 에러
          if(regexCheckNumber.test(customDelimiters)) throw new Error('[ERROR]');
  
          return customDelimiters;
        }
        const customDelimiters = verifyCustomDelimiter(customRegisterPart);
        // 구분자 통합
        const integrateDelimiter = (accSet, currList) => {
          if(currList){
            [...currList].forEach((v) => accSet.add(v));
          }
          return accSet;
        }
        // 구분자 합치기
        const integratedDelimiter = integrateDelimiter(baseDelimiters, customDelimiters);

        const verifyTargetString = (target, delimiters) => {
          const regexOutsideDelimiter = new RegExp(`[^${Array.from(delimiters).join('')}\\d]`);
          // 타겟 문자열부가 공백인지 검증
          if( !target ) throw new Error('[ERROR]');
          // 타겟 문자열 부에 숫자가 없을 경우 에러
          if(!regexCheckNumber.test(target)) throw new Error('[ERROR]');
          // 타겟 문자열 부에 등록된 구분자와 숫자 외에 다른 문자가 있을 경우 에러
          if(regexOutsideDelimiter.test(target)) throw new Error('[ERROR]');

          return target;
        }
        const targetString = verifyTargetString(targetStringPart, integratedDelimiter);

        return [integratedDelimiter, targetString];
      }
      
      
      const [delimiters, targetString] = parsingDelimiterAndTarget(userInput);

      

      const getSumResult = (delimiters, targetString) => {
        const regexMatchDelimiter = new RegExp(`[${Array.from(delimiters).join('')}]`);
        const delimitedStringArray = targetString.split(regexMatchDelimiter);
        const sumResult = delimitedStringArray.reduce((acc, cur) => {
          if(cur === '') cur = '0';
          return acc + Number(cur);
        }, 0);
        return sumResult
      }
      
      const result = getSumResult(delimiters, targetString)

      //결과 출력
      Console.print(`결과 : ${result}`);
    }
    catch(e) {
      Console.print(e.message);
      throw(e);
    }
  }
}

export default App;
