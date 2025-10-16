import { Console } from "@woowacourse/mission-utils";
class App {
  async run() {
    // 사용자 입력
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    // 문자열에 숫자가 포함됐는지 검증
    const hasNumberPattern = new RegExp('\\d');
    if( !hasNumberPattern.test(input) ) return;
    


  }
}

export default App;
