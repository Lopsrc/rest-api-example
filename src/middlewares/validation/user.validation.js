const ApiError = require("../../pkg/error");
var validator = require('validator');
/**
 * Retrieves a user based on the provided email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @throws {ApiError} - Throws an error if the email is not provided.
 * @returns {void}
 */
const getUser = (email) => {
    if (!email || !(validator.isEmail(email))) {
        throw new ApiError(400, "invalid credentials"); 
    }
    return;
}

/**
 * Creates a new user with the provided details.
 *
 * @param {object} body - The details of the user to create.
 * @param {string} body.name - The name of the user.
 * @param {string} body.email - The email of the user.
 * @param {number} body.age - The age of the user.
 * @throws {ApiError} - Throws an error if any of the required details are not provided.
 * @returns {void}
 */
const createUser = (body) => {
    if (
        !body.name ||!body.email ||!body.age || !(validator.isEmail(body.email))
    ) {
        throw new ApiError(400, "invalid credentials");
    }
    return;
}

/**
 * Updates an existing user with the provided details.
 *
 * @param {object} body - The details of the user to update.
 * @param {string} body.name - The name of the user.
 * @param {string} body.email - The email of the user.
 * @param {number} body.age - The age of the user.
 * @throws {ApiError} - Throws an error if any of the required details are not provided.
 * @returns {void}
 */
const updateUser = (body) => {
    if (
        !body.name ||!body.email ||!body.age || !(validator.isEmail(body.email))
    ) {
        throw new ApiError(400, "invalid credentials");
    }
    return;
}

/**
 * Deletes a user based on the provided email.
 *
 * @param {string} email - The email of the user to delete.
 * @throws {ApiError} - Throws an error if the email is not provided.
 * @returns {void}
 */
const deleteUser = (email) => {
    if (!email || !(validator.isEmail(email))) {
        throw new ApiError(400, "invalid credentials");
    }
    return;
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
};