const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');

const commonMW = require ("./middlewares/commonMiddlewares")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(commonMW.mid1)

app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
