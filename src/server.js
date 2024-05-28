const express = require('express');

const config = require('./config/config');
const logger = require('./pkg/logger');
const bodyParser = require('body-parser');

const v1userRouter = require('./v1/routes/user.routes');
const v1carRouter = require('./v1/routes/car.routes');

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/user', v1userRouter);
app.use('/api/v1/car', v1carRouter);

const start = function(){
    app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
}

module.exports = start;