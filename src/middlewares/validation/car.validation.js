const ApiError = require("../../pkg/error");

/**
 * Retrieves a car by its ID.
 * @param {string} id - The ID of the car to retrieve.
 * @throws Will throw an ApiError if the ID is not provided.
 * @returns {void}
 */
const getCar = (id) => {
    if (!id) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

/**
 * Creates a new car.
 * @param {object} body - The body of the request containing car details.
 * @param {string} body.id - The ID of the car.
 * @param {string} body.brand - The brand of the car.
 * @param {string} body.model - The model of the car.
 * @param {string} body.color - The color of the car.
 * @param {string} body.regNum - The registration number of the car.
 * @throws Will throw an ApiError if any required field is missing.
 * @returns {void}
 */
const createCar = (body) => {
    if (
        !body.id    ||!body.brand ||!body.model ||
        !body.color ||!body.regNum 
    ) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

/**
 * Updates an existing car.
 * @param {object} body - The body of the request containing updated car details.
 * @param {string} body.id - The ID of the car.
 * @param {string} body.brand - The brand of the car.
 * @param {string} body.model - The model of the car.
 * @param {string} body.color - The color of the car.
 * @param {string} body.regNum - The registration number of the car.
 * @throws Will throw an ApiError if any required field is missing.
 * @returns {void}
 */
const updateCar = (body) => {
    if (
        !body.id    ||!body.brand ||!body.model ||
        !body.color ||!body.regNum 
    ) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

/**
 * Deletes a car by its ID.
 * @param {string} id - The ID of the car to delete.
 * @throws Will throw an ApiError if the ID is not provided.
 * @returns {void}
 */
const deleteCar = (id) => {
    if (!id) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

module.exports = {
    getCar,
    createCar,
    updateCar,
    deleteCar,
};