$(document).ready(onReady);

function onReady(){
  $('#calculateButton').on('click', calculateButtonPressed);
}

function calculateButtonPressed(){
  let x = $('#xInput').val();
  let y = $('#yInput').val();
  let operation = $('#operationSelector').val();
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

function displayResult(result){
  $('#result').empty();
  $('#result').append(result);
}//end displayResult
