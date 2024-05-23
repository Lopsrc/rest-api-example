const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const fs = require("fs"); // Or `import fs from "fs";` with ESM

// Check if the file exists, if not, load configuration for 
if (fs.existsSync('../../config/local/.env.example')) {
    // Do something
    dotenv.config({ path: path.join(__dirname, '../../config/local/.env.example') });
}else{
    dotenv.config({ path: path.join(__dirname, '../../config/prod/.env.example') });
}
// dotenv.config({ path: path.join(__dirname, '../../docker/.env.example') });

const envVarsSchema = Joi.object()
    .keys({
        ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required().description('PostgreSQL url'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    console.log("config read error", error);//throw new Error(`Config validation error: ${error.message}`);
}
module.exports = {
    env: envVars.ENV,
    port: envVars.PORT,
    database: envVars.DATABASE_URL,
};