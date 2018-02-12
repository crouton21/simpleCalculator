$(document).ready(onReady);
let operation;
let equationToSend=[];
let history;

function onReady(){
  $('#calculateButton').on('click', calculateButtonPressed);
  $('#addButton').on('click', add);
  $('#subtractButton').on('click', subtract);
  $('#multiplyButton').on('click', multiply);
  $('#divideButton').on('click', divide);
  $('#clearButton').on('click', clearDisplays);
  $('.numberButtons').on('click', numberClicked);
  $('#prevAnswer').on('click', displayLastAnswer);
  $('#clearHistoryButton').on('click', clear);
}

function calculateButtonPressed(){
  let xy = determineXAndY();
  let x = xy[0];
  let y = xy[1];
  $('#display').empty();
  $('#results').empty();
  let inputObject = {x: x,
                     y: y,
                     operation: operation};
  console.log(inputObject);
  $.ajax({
    type:'POST',
    url: '/calculate',
    data: inputObject
  }).done(function(response){
    getHistory();
  }).fail(function(response){
    console.log('POST FAIL:',response);
  });
  equationToSend = [];
}//end calculateButtonPressed

function getHistory(){
  $.ajax({
    type:'GET',
    url:'/calculate'
  }).done(function(response){
    history = response;
    displayHistory(response);
    console.log('success', response);
  }).fail(function(response){
    console.log('GET FAIL:', response)
  });
}

function add(){
  operation = $('#addButton').val();
  $('#addButton').css("background-color", "#ccccff");
  equationToSend.push(operation);
  $('#display').append('+');
}

function subtract(){
  operation = $('#subtractButton').val();
  $('#subtractButton').css("background-color", "#ccccff");
  equationToSend.push(operation);
  $('#display').append('-');
}

function multiply(){
  operation = $('#multiplyButton').val();
  $('#multiplyButton').css("background-color", "#ccccff");
  equationToSend.push(operation);
  $('#display').append('*');
}

function divide(){
  operation = $('#divideButton').val();
  $('#divideButton').css("background-color", "#ccccff");
  equationToSend.push(operation);
  $('#display').append('/');
}

function numberClicked(){
  let number = $(this).val();
  $('#display').append(number);
  equationToSend.push(number);
  console.log(equationToSend);
}

function determineXAndY(){
  let x='';
  let y='';
  let indexOfOperation;
  console.log(equationToSend.indexOf('add',0));
  console.log(equationToSend.indexOf('subtract',0));
  console.log(equationToSend.indexOf('multiply',0));
  console.log(equationToSend.indexOf('divide',0));
  if (equationToSend.indexOf('add',0) != -1){
    indexOfOperation = equationToSend.indexOf('add',0);
  }
  else if (equationToSend.indexOf('subtract',0) != -1){
    indexOfOperation = equationToSend.indexOf('subtract',0);
  }
  else if (equationToSend.indexOf('multiply',0) != -1){
    indexOfOperation = equationToSend.indexOf('multiply',0);
  }
  else if (equationToSend.indexOf('divide',0) != -1){
    indexOfOperation = equationToSend.indexOf('divide',0);
  }
  console.log(indexOfOperation, 'index of operation');
  for (let i=0; i<indexOfOperation; i++){
    //add everthing before index of operation to variable x
    x += String(equationToSend[i]);
  }
  for (let i=indexOfOperation+1; i<equationToSend.length; i++){
    //add everthing after index of operation to variable y
    y += String(equationToSend[i]);
  }
  x = Number(x);
  y = Number(y);
  return [x,y];
}

function displayHistory(history){
  $('#result').empty();
  console.log('history', history);
  for (var i=0; i<history.length; i++){
    console.log('operation', history[i]);
    $('#results').append(history[i]);
    $('#results').append('<br>');
  }
  $('#addButton').css("background-color", "#F5F5F5");
  $('#subtractButton').css("background-color", "#F5F5F5");
  $('#multiplyButton').css("background-color", "#F5F5F5");
  $('#divideButton').css("background-color", "#F5F5F5");
}//end displayResult

function clearDisplays(){
  $('#addButton').css("background-color", "#F5F5F5");
  $('#subtractButton').css("background-color", "#F5F5F5");
  $('#multiplyButton').css("background-color", "#F5F5F5");
  $('#divideButton').css("background-color", "#F5F5F5");
  $('#display').empty();
  equationToSend = [];
}

function clear(){
  $('#results').empty();
  clearDisplays();
  //ajax post to clear history array
  $.ajax({
    type:'POST',
    url: '/calculate/clear',
    data: {emptyArray: []}
  }).done(function(response){
    console.log(response);
  }).fail(function(response){
    console.log('POST FAIL:',response);
  });
}

function getLastAnswer(listOfEquations){
  let lastEquation = listOfEquations[(listOfEquations.length)-1];
  //reset global variable last answer based on resopnse
  lastEquation = lastEquation.split('');
  let indexOfEquals;
  let lastAnswer='';
  for (var i=0; i<lastEquation.length; i++){
    if (lastEquation[i]=='='){
      indexOfEquals = i;
      break;
    }
  }
  for (var i=indexOfEquals+2; i<lastEquation.length; i++){
    lastAnswer += String(lastEquation[i]);
  }
  return Number(lastAnswer);
}

function displayLastAnswer(){
  let lastAnswer = getLastAnswer(history);
  console.log(lastAnswer);
  $('#display').append(lastAnswer);
  lastAnswer = String(lastAnswer);
  console.log(typeof(lastAnswer));
  lastAnswer = lastAnswer.split('');
  console.log(lastAnswer, 'after split');
  for (var i=0; i<lastAnswer.length; i++){
    equationToSend.push(lastAnswer[i]);
  }
}
