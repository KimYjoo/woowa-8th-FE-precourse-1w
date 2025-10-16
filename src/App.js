import { Console } from "@woowacourse/mission-utils";
class App {
  async run() {
    

    const spliter = new Set([",", ":"]);
    // 사용자 입력
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    // 입력이 공백인지 검증
    if( !input ) return;
    
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
      if ( hasNumberPattern.test(customSpliters) ) return;
      // 커스텀 구분자를 전체 구분자 집합에 추가
      [...customSpliters].forEach((v) => spliter.add(v));
    }
    
    // 일반 문자열부가 공백인지 검증
    if( !normalString ) return;
    // 일반 문자열부를 등록된 구분자로 분리
    const useSpliterPattern = new RegExp(`[${Array.from(spliter).join('')}]`);
    const numbers = normalString.split(useSpliterPattern);

    // 배열의 요소들을 숫자로 변환하여 모두 더한 값을 저장
    const sum = numbers.reduce((acc, cur) => {
      const num = Number(cur);
      // 배열 요소가 숫자로 변환가능한지 검증
      if(Number.isFinite(num)){
        return acc + num;
      }
      else{
        return acc;
      }
    }, 0);
  }
}

export default App;
