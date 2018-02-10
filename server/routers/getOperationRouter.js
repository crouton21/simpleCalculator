const express = require('express');
const router = express.Router();
const getHistoryModule = require('../modules/getHistoryModule');
const doOperationModule = require('../modules/doOperationModule');
const getSignModule = require('../modules/getSignModule');
let operationObject;
let completedOperation;
let sign;

router.post('/', function(request, response){
  operationObject = request.body;
  completedOperation = doOperationModule(operationObject.x, operationObject.y, operationObject.operation);
  sign = getSignModule(operationObject.operation);
  getHistoryModule.addFinishedOperation(operationObject.x + ' ' + sign + ' ' + operationObject.y + ' = ' + completedOperation);
  //response.send({calculateResult: completedOperation});
  response.sendStatus(200);
})

router.get('/', function(request, response){
  let history = getHistoryModule.getHistory();
  //get all history with getHistoryModule
  //send history
  response.send(history);
})

router.post('/clear', function(request, response){
  getHistoryModule.clearHistory();
  response.sendStatus(200);
})

module.exports = router;
