import { parseInput } from "./parser.js";
import { validateCustomDelimiter, validateTargetString } from "./validator.js";
import { integrateDelimiter } from "./delimiter.js";
import { splitStringWithDelimiters } from "./tokenizer.js";
import { sumStringArray } from "./sumArray.js";

export default function calculateSumFromString (userInput) {
    const {customPart, targetPart} = parseInput(userInput);
    const validatedCustomDelimiters = validateCustomDelimiter(customPart);
    const integratedDelimiter = integrateDelimiter(validatedCustomDelimiters);
    const validatedTargetString = validateTargetString(targetPart, integratedDelimiter);
    const splittedString = splitStringWithDelimiters(integratedDelimiter, validatedTargetString);
    return sumStringArray(splittedString)
} 
