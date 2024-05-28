const pool = require("../../pkg/clients/postgres/client");

/**
 * Retrieves all cars from the database ordered by id in descending order.
 * @returns {Promise<Array>} An array of car objects.
 */
const getAllcars = async () => {
    const query = "SELECT * FROM car ORDER BY id DESC";
    return (await pool.query(query)).rows;
};

/**
 * Retrieves a car by its id from the database.
 * @param {number} id - The id of the car to retrieve.
 * @returns {Promise<Object>} A car object.
 */
const getById = async (id) => {
    const query = "SELECT * FROM car WHERE id = $1";
    return (await pool.query(query, [id])).rows[0];
};

/**
 * Creates a new car in the database.
 * @param {Object} car - The car object to create.
 * @param {string} car.brand - The brand of the car.
 * @param {string} car.model - The model of the car.
 * @param {string} car.color - The color of the car.
 * @param {string} car.regNum - The registration number of the car.
 * @param {number} car.id - The id of the person who owns the car.
 * @returns {Promise<number>} The id of the newly created car.
 */
const createCar = async (car) => {
    const query = "INSERT INTO car (brand, model, color, reg_num, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    return (await pool.query(query, [car.brand, car.model, car.color, car.regNum, car.id])).rows[0].id;
};

/**
 * Updates an existing car in the database.
 * @param {Object} car - The car object to update.
 * @param {number} car.id - The id of the car to update.
 * @param {string} car.brand - The updated brand of the car.
 * @param {string} car.model - The updated model of the car.
 * @param {string} car.color - The updated color of the car.
 * @param {string} car.regNum - The updated registration number of the car.
 * @returns {Promise<number>} The id of the updated car.
 */
const updateCar = async (car) => {
    const query = "UPDATE car SET brand = $1, model = $2, color = $3, reg_num = $4 WHERE id = $5 RETURNING id";
    return (await pool.query(query, [car.brand, car.model, car.color, car.regNum, car.id])).rows[0].id;
}

/**
 * Deletes a car from the database by its id.
 * @param {number} id - The id of the car to delete.
 * @returns {Promise<Object>} The deleted car object.
 */
const deleteCar = async (id) => {
    const query = "DELETE FROM car WHERE id = $1 RETURNING id";
    return (await pool.query(query, [id])).rows[0];
}

module.exports = { 
    getAllcars,
    getById,
    createCar,
    updateCar,
    deleteCar,
};