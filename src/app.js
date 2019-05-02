require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./cors-whitelist');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';


app.use(morgan(morganOption));
app.use(cors({origin: corsOptions}));
app.use(express.json());
app.use(helmet());


app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
});

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }

    if(error.type === 'CORS') {
      res.status(403).end()
    }
    res.status(500).json(response)
    
});

module.exports = app;