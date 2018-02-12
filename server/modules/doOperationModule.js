function performOperation(x, y, operation){
  console.log('in performOperation, operation', operation);
  x = Number(x);
  y = Number(y);
  console.log('in performOperation, x', typeof(x));
  console.log('in performOperation, y', typeof(y));
  if (operation == 'add'){
    console.log(x+y);
    return x + y;
  }
  else if (operation == 'subtract'){
    console.log(x-y);
    return x - y;
  }
  else if (operation == 'multiply'){
    console.log(x*y);
    return x * y;
  }
  else if (operation == 'divide'){
    console.log(x/y);
    return x / y;
  }
}

module.exports = performOperation;
