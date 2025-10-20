export const sumStringArray = (array) => {
    const sumResult = array.reduce((acc, cur) => {
        if(cur === '') cur = '0';
        return acc + Number(cur);
    }, 0);
    return sumResult;
}