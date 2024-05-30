const app = require("./app");

const config = require('./config/config');
const logger = require('./pkg/logger');

app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
});
