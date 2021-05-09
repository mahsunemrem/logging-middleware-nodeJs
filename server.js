require('dotenv').config({ path: './config/config.env' })
const bodyParser = require('body-parser');
const express = require('express');
const Logger = require('./helper/logging/logger')
const requestLogging = require('./middlewares/request-logging')
const errorHandling = require('./middlewares/error-handling')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(requestLogging)

app.use('/success',(req,res,next) => {
    Logger.info('Request Logging')
    res.json({
        
        success: true
    })
})

app.use('/error',(req,res,next) => {

    throw new Error('errorr!!!!!')

})

app.use(errorHandling)

app.listen(process.env.PORT,() => {
    console.log(`App started on ${process.env.PORT} || ${process.env.NODE_ENV}`);
});

