function handleStringOrNumber(input: string | number): void {
    if (typeof input === 'string')
     {
      console.log(` ${input.toUpperCase()}`);

    } 
    else if (typeof input === 'number')
     {
      console.log(`${input * input}`);

    }
     else
      {
      console.log('invalid type');
    }
  }

  handleStringOrNumber('naveed');   
  handleStringOrNumber(123);     
  
  