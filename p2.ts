
function f1(input: string | number): number {
    
    if (typeof input === 'string') {
      return input.length;
    } else {
      return input * input;
    }
}
  const fString = f1("naveed")
  console.log(fString)
  const fNumber = f1(7)
  console.log(fNumber) 
  