$(document).ready(onReady);
let operation;

function onReady(){
  $('#calculateButton').on('click', calculateButtonPressed);
  $('#addButton').on('click', add);
  $('#subtractButton').on('click', subtract);
  $('#multiplyButton').on('click', multiply);
  $('#divideButton').on('click', divide);
  $('#clearButton').on('click', clear);
}

function calculateButtonPressed(){
  let x = $('#xInput').val();
  let y = $('#yInput').val();
  //let operation = $('#operationSelector').val();
  let inputObject = {x: x,
                     y: y,
                     operation: operation};
  console.log(inputObject);
  $.ajax({
    type:'POST',
    url: '/calculate',
    data: inputObject
  }).done(function(response){
    console.log(response.calculateResult);
    displayResult(response.calculateResult);
    //do something when post is complete
  }).fail(function(response){
    console.log('POST:',response);
  });
}//end calculateButtonPressed

function add(){
  operation = $('#addButton').val();
  $('#addButton').css("background-color", "#ccccff");
}

function subtract(){
  operation = $('#subtractButton').val();
  $('#subtractButton').css("background-color", "#ccccff");
}

function multiply(){
  operation = $('#multiplyButton').val();
  $('#multiplyButton').css("background-color", "#ccccff");
}

function divide(){
  operation = $('#divideButton').val();
  $('#divideButton').css("background-color", "#ccccff");
}

function displayResult(result){
  $('#result').empty();
  $('#result').append(result);
  let x = $('#xInput').val('');
  let y = $('#yInput').val('');
  $('#addButton').css("background-color", "#F5F5F5");
  $('#subtractButton').css("background-color", "#F5F5F5");
  $('#multiplyButton').css("background-color", "#F5F5F5");
  $('#divideButton').css("background-color", "#F5F5F5");
  //let operation = $('#operationSelector').val('add');
}//end displayResult

function clear(){
  $('#result').empty();
  let x = $('#xInput').val('');
  let y = $('#yInput').val('');
  $('#addButton').css("background-color", "#F5F5F5");
  $('#subtractButton').css("background-color", "#F5F5F5");
  $('#multiplyButton').css("background-color", "#F5F5F5");
  $('#divideButton').css("background-color", "#F5F5F5");
}
