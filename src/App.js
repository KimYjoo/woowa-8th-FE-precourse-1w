import { Console } from "@woowacourse/mission-utils";
class App {
  async run() {
    

    try{
      const spliter = new Set([",", ":"]);
      // 사용자 입력
      const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

      // 입력이 공백인지 검증
      if( !input ) throw new Error('[ERROR]');
      
      // 문자열에 숫자가 포함되었는지 검증
      const hasNumberPattern = new RegExp('\\d');
      // 커스텀 구분자와 일반 문자열을 추출
      const getCustomPattern = new RegExp('^(?:(?:\/\/)(.*)?(?:\\\\n))?(.*)?');
      const arrs = getCustomPattern.exec(input);
      const customSpliters = arrs[1];
      const normalString = arrs[2];

      // 커스텀 구분자 정의부가 추출되었는지 확인
      if( customSpliters ) {
        // 커스텀 구분자에 숫자가 있는지 확인
        if ( hasNumberPattern.test(customSpliters) ) throw new Error('[ERROR]');
        // 커스텀 구분자를 전체 구분자 집합에 추가
        [...customSpliters].forEach((v) => spliter.add(v));
      }
      
      // 일반 문자열부가 공백인지 검증
      if( !normalString ) throw new Error('[ERROR]');
      // 일반 문자열부를 등록된 구분자로 분리
      const useSpliterPattern = new RegExp(`[${Array.from(spliter).join('')}]`);
      const regexOutsideDelimiter = new RegExp(`[^${Array.from(spliter).join('')}\\d]`);
      const numbers = normalString.split(useSpliterPattern);
      if(regexOutsideDelimiter.test(normalString)) throw new Error('[ERROR]');
      // 배열의 요소들을 숫자로 변환하여 모두 더한 값을 저장
      const sum = numbers.reduce((acc, cur) => {
        const num = Number(cur);
        // 배열 요소가 숫자로 변환가능한지 검증
        if(Number.isFinite(num)){
          return acc + num;
        }
        else{
          throw new Error('[ERROR]');
        }
      }, 0);

      Console.print(`결과 : ${sum}`);
    }
    catch(e) {
      Console.print(e);
      throw(e);
    }
  }
}

export default App;
