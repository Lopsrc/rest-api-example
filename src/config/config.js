const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv?.config({ path: path.join(__dirname, '../../config/local/.env.example') });

const envVarsSchema = Joi.object()
    .keys({
        ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required().description('PostgreSQL url'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    console.log("config read error", error.message);
}

module.exports = {
    env: envVars.ENV || process.env.ENV,
    port: envVars.PORT || process.env.PORT,
    database: envVars.DATABASE_URL || process.env.DATABASE_URL,
};