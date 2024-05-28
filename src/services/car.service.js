const repositoryUser = require('../database/postgres/user.db');
const repositoryCar = require('../database/postgres/car.db');
const ApiError = require('../pkg/error');

/**
 * Retrieves all cars from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of car objects.
 * @throws {ApiError} If there are no cars in the database.
 */
const getAllCars = async function(){
    try {
        const cars = await repositoryCar.getAllcars();
        if (cars.length == 0){
            throw new ApiError(400, "cars are not exist");
        }

        return cars;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a car from the database by its id.
 *
 * @param {number} id - The id of the car to retrieve.
 * @returns {Promise<Object>} A promise that resolves to a car object.
 * @throws {ApiError} If the car is not found in the database.
 */
const getById = async function(id) {
    try {
        const car = await repositoryCar.getById(id);
        if (!car){
            throw new ApiError(400, "Car is not exist");
        }

        return car;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new car in the database.
 *
 * @param {Object} newCar - The car object to create.
 * @returns {Promise<number>} A promise that resolves to the id of the newly created car.
 * @throws {ApiError} If the user associated with the car does not exist.
 * @throws {ApiError} If the car already exists in the database.
 */
const createCar = async function(newCar) {
    try {
        const user = await repositoryUser.getById(newCar.id);
        if (!user){
            throw new ApiError(400, "User is not exist");
        }

        return await repositoryCar.createCar(newCar);
    } catch (error) {
        if (error.code == 23505){ // The code is postgres error code.
            throw new ApiError(400, "Car is already exist");
        }
        throw error;
    }
};

/**
 * Updates an existing car in the database.
 *
 * @param {Object} carUpdate - The updated car object.
 * @returns {Promise<number>} A promise that resolves to the id of the updated car.
 * @throws {ApiError} If the car is not found in the database.
 */
const updateCar = async function(carUpdate){
    try {
        await getById(carUpdate.id);

        const id = await repositoryCar.updateCar(carUpdate);
        if (!id){
            throw new ApiError(400, "Car is not exist");
        }

        return id;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a car from the database by its id.
 *
 * @param {number} id - The id of the car to delete.
 * @returns {Promise<number>} A promise that resolves to the id of the deleted car.
 * @throws {ApiError} If the car is not found in the database.
 */
const deleteCar = async function(id){
    try {
        const idReturned = await repositoryCar.deleteCar(id);
        if (!idReturned){
            throw new ApiError(400, "Car is not exist");
        }

        return idReturned;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


module.exports = {
    getAllCars,
    getById,
    createCar,
    updateCar,
    deleteCar,
};