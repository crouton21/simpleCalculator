let express = require('express');
let app = express();

app.use(express.static('server/public'));

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( { extended: true } ));

const operationRouter = require('./routers/getOperationRouter');
app.use('/calculate', operationRouter);

const port = 5000;
app.listen(port, function(){
  console.log(`server listening on port ${port}`);
})
