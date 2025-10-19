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

        const regexParsingString = new RegExp('^(?:(\/\/)(.*)?(\\\\n))?(.*)?');
        const [, customStart, customDelimiters, customEnd, targetString] = regexParsingString.exec(userInput);

        const verifyCustomDelimiter = (customStart, custom, customEnd) => {
          // 커스텀 구분자 정의부가 매칭되지 않았다면 바로 반환
          if(!(customStart && customEnd)) return null;
          // 커스텀 구분자가 공란이면 에러
          if(!custom) throw new Error('[ERROR]');
          // 숫자가 구분자로 사용됐을 때 에러
          if(regexCheckNumber.test(custom)) throw new Error('[ERROR]');
  
          return custom;
        }

        const verifiedCustomDelimiters = verifyCustomDelimiter(customStart, customDelimiters, customEnd);
        // 구분자 통합
        const integrateDelimiter = (accSet, currList) => {
          if(currList){
            [...currList].forEach((v) => accSet.add(v));
          }
          return accSet;
        }
        // 구분자 합치기
        const integratedDelimiter = integrateDelimiter(baseDelimiters, verifiedCustomDelimiters);

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
        const verifiedTargetString = verifyTargetString(targetString, integratedDelimiter);

        return [integratedDelimiter, verifiedTargetString];
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
