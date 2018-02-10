let historyArray = [];

function addFinishedOperation(finishedOperation){
  historyArray.push(finishedOperation);
}

function getHistory(){
  return historyArray;
}

function clearHistory(){
  historyArray = [];
  return historyArray;
}

module.exports = {
  addFinishedOperation: addFinishedOperation,
  getHistory: getHistory,
  clearHistory: clearHistory
}
