const { param, body, validationResult } = require('express-validator'); 
const logger = require('../../pkg/logger');

const minAge = 1;
const errInvalidCredentials = 'invalid credentials';

/**
 * Returns validation rules for GET requests.
 * @returns {Array} - Array of validation rules.
 */
const getValidationRules = () => {
    return [
        param('email').isEmail(),
    ]
}

/**
 * Returns validation rules for POST requests.
 * @returns {Array} - Array of validation rules.
 */
const createValidationRules = () => {
    return [
        body('name').notEmpty(),
        body('email').isEmail(),
        body('age').isInt({min: minAge}),
    ]
}

/**
 * Returns validation rules for PUT requests.
 * @returns {Array} - Array of validation rules.
 */
const updateValidationRules = () => {
    return [
        body('name').notEmpty(),
        body('email').isEmail(),
        body('age').isInt({min: minAge}),
    ]
}

/**
 * Returns validation rules for DELETE requests.
 * @returns {Array} - Array of validation rules.
 */
const deleteValidationRules = () => {
    return [
        param('email').isEmail(),
    ]
}

/**
 * Returns validation rules for password recovery requests.
 * @returns {Array} - Array of validation rules.
 */
const recoveryValidationRules = () => {
    return [
        param('email').isEmail(),
    ]
}

/**
 * Middleware function to validate request data.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - Express response object if validation fails.
 */
const validation =  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    logger.error(errInvalidCredentials);

    return res.status(400).send({
        status: 'FAILED',
        data: errInvalidCredentials,
    });
}

module.exports = {
    getValidationRules,
    createValidationRules,
    updateValidationRules,
    deleteValidationRules,
    recoveryValidationRules,
    validation,
};