function SumOrCat(arr: (string | number)[]): string | number {
    if (arr.every((item) => typeof item === 'string')) 

    return arr.join('');
    
    else
    {
      let sum = 0;
      for (const num of arr) {
        sum += num as number;
      }
      return sum;
    }
    return "Invalid input";
  }
  const s1 = SumOrCat(["Naveed", "qureshi"]);
  console.log(s1);
  
  const n1 = SumOrCat([1, 2, 3, 4, 5]);
  console.log(n1); 
  
  