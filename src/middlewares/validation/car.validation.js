const { param, body, validationResult } = require('express-validator'); 
const logger = require('../../pkg/logger');

const minLengthRegNum = 8;
const maxLengthRegNum = 9;
const errInvalidCredentials = 'invalid credentials';

/**
 * Returns validation rules for GET requests.
 * @returns {Array} - Array of validation rules.
 */
const getValidationRules = () => {
    return [
        param('id').isInt({min: 1}),
    ]
}

/**
 * Returns validation rules for POST requests.
 * @returns {Array} - Array of validation rules.
 */
const createValidationRules = () => {
    return [
        body('id').isInt({min: 1}),
        body('brand').notEmpty(),
        body('model').notEmpty(),
        body('color').notEmpty(),
        body('regNum')
        .notEmpty()
        .isLength({min:minLengthRegNum, max:maxLengthRegNum}),
    ]
}

/**
 * Returns validation rules for PUT requests.
 * @returns {Array} - Array of validation rules.
 */
const updateValidationRules = () => {
    return [
        body('id').isInt({min: 1}),
        body('brand').notEmpty(),
        body('model').notEmpty(),
        body('color').notEmpty(),
        body('regNum')
        .notEmpty()
        .isLength({min:minLengthRegNum, max:maxLengthRegNum}),
    ]
}

/**
 * Returns validation rules for DELETE requests.
 * @returns {Array} - Array of validation rules.
 */
const deleteValidationRules = () => {
    return [
        param('id').isInt({min: 1}),
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
    logger.error(errInvalidCredentials)

    return res.status(400).send({
        status: 'FAILED',
        data: "invalid credentials",
    });
}
module.exports = {
    getValidationRules,
    createValidationRules,
    updateValidationRules,
    deleteValidationRules,
    validation,
};