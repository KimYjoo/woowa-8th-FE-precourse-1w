import { Console } from "@woowacourse/mission-utils";
import calculateSumFromString from "./calculator/index.js";
import { INPUT_MESSAGE, ERROR_MESSAGE } from "./share/constants.js";

const getUserInput = async () => {
  // 사용자 입력
  const input = await Console.readLineAsync(INPUT_MESSAGE);
  // 입력이 공백인지 검증
  if( !input ) throw new Error(ERROR_MESSAGE.INPUT_EMPTY);
  return input
}

const printResult = (result) => {
  Console.print(`결과 : ${result}`);
}

class App {
  async run() {
    try{
      const userInput = await getUserInput();
      const result = calculateSumFromString(userInput);
      printResult(result);
    }
    catch(e) {
      Console.print(e.message);
      throw(e);
    }
  }
}

export default App;
