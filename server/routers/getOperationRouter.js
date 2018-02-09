const express = require('express');
const router = express.Router();
const doOperationModule = require('../modules/doOperationModule');
let operationObject;
let completedOperation;

router.post('/', function(request, response){
  console.log(request.body);
  operationObject = request.body;
  console.log('operationObject',operationObject);
  completedOperation = doOperationModule(operationObject.x, operationObject.y, operationObject.operation);
  console.log('completedOperation', completedOperation);
  response.send({calculateResult: completedOperation});
})

module.exports = router;
