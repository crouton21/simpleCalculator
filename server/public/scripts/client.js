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
  $('#clearButton').on('click', clear);
  $('.numberButtons').on('click', numberClicked);
  $('#prevAnswer').on('click', displayLastAnswer);
}

function calculateButtonPressed(){
  if (!checkForTwoOperations()){
    alert('Sorry this calculator is stupid, only one calculation at a time!');
    $('#display').empty();
    $('#addButton').css("background-color", "#F5F5F5");
    $('#subtractButton').css("background-color", "#F5F5F5");
    $('#multiplyButton').css("background-color", "#F5F5F5");
    $('#divideButton').css("background-color", "#F5F5F5");
    equationToSend = [];
    return;
  }
  else{
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
    //console.log(response.calculateResult);
    //displayResult(response.calculateResult);
    getHistory();
    //do something when post is complete
  }).fail(function(response){
    console.log('POST FAIL:',response);
  });
  equationToSend = [];
}//end else
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
  equationToSend.push(Number(number));
}

function determineXAndY(){
  let x='';
  let y='';
  let indexOfOperation;
  for (let i=0; i<equationToSend.length; i++){
    //find index of operation
    if (typeof(equationToSend[i])=="string"){
      indexOfOperation = i;
    }
  }
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
  //let operation = $('#operationSelector').val('add');
}//end displayResult

function clear(){
  $('#results').empty();
  $('#addButton').css("background-color", "#F5F5F5");
  $('#subtractButton').css("background-color", "#F5F5F5");
  $('#multiplyButton').css("background-color", "#F5F5F5");
  $('#divideButton').css("background-color", "#F5F5F5");
  $('#display').empty();
  equationToSend = [];
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

function checkForTwoOperations(){
  let numOperations=0
  for (var i=0; i<equationToSend.length; i++){
    if (typeof(equationToSend[i])=="string"){
        numOperations += 1;}}
  if (numOperations == 1){return true;}
  else{return false;}
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
    lastAnswer += lastEquation[i];
  }
  return lastAnswer;
}

function displayLastAnswer(){
  let lastAnswer = getLastAnswer(history);
  console.log(lastAnswer);
  $('#display').append(lastAnswer);
  console.log(lastAnswer);
  lastAnswer = lastAnswer.split('');
  for (var i=0; i<lastAnswer.length; i++){
    equationToSend.push(Number(lastAnswer[i]));
  }
}
