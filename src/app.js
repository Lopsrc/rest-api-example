const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/options');

const v1userRouter = require('./v1/routes/user.routes');
const v1carRouter = require('./v1/routes/car.routes');

const app = express();

app.use(bodyParser.json());
// create routes.
app.use('/api/v1/user', v1userRouter);
app.use('/api/v1/car', v1carRouter);
app.get('/health', (req, res) => {
    res.status(200).send({status: 'OK'});
});

// endpoints for API documentation (swagger)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
});

module.exports = app;