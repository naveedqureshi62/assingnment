var input;
input: "qureshi";
input: 1223;
function getLengthOrSquare(input) {
    if (typeof input === 'string') {
        return input.length;
    }
    else {
        return input * input;
    }
}
//   const resultString = getLengthOrSquare("naveed");
//   console.log(resultString);  
//   const resultNumber = getLengthOrSquare(7);
//   console.log(resultNumber); 
