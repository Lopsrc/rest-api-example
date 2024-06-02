const repositoryUser = require('../database/postgres/user.db');
const repositoryCar = require('../database/postgres/car.db');
const ApiError = require('../pkg/error');

/**
 * Function to get all cars from the database.
 * @returns {Promise<Array>} - A promise that resolves to an array of car objects.
 * @throws {ApiError} - If there are no cars in the database.
 */
const getAllCars = async function(){
    return await repositoryCar.getAllcars()
    .then(cars => {
        if (cars.length == 0){
            throw new ApiError(400, "cars are not exist");
        }
        return cars;
    })
    .catch(error => { throw error; });
};

/**
 * Function to get a car by its id from the database.
 * @param {number} id - The id of the car to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to a car object.
 * @throws {ApiError} - If the car does not exist in the database.
 */
const getById = async function(id) {
    return await repositoryCar.getById(id)
    .then(result => {
        if (!result){
            throw new ApiError(400, "Car is not exist");
        }
        return result;
    })
    .catch(error => { throw error; })
};

/**
 * Function to create a new car in the database.
 * @param {Object} newCar - The new car object to create.
 * @returns {Promise<number>} - A promise that resolves to the id of the newly created car.
 * @throws {ApiError} - If the user does not exist in the database.
 * @throws {ApiError} - If the car already exists in the database.
 */
const createCar = async function(newCar) {
    await repositoryUser.getById(newCar.id)
    .then(user => {
        if (!user){
            throw new ApiError(400, "User is not exist");
        }
    })
    .catch(error => { throw error;} );

    return await repositoryCar.createCar(newCar)
    .then(id => id)
    .catch(error => {
        if (error.code == 23505){ // The code is postgres error code.
            throw new ApiError(400, "Car is already exist");
        }
        throw error;
    })
};

/**
 * Function to update an existing car in the database.
 * @param {Object} carUpdate - The updated car object.
 * @returns {Promise<number>} - A promise that resolves to the id of the updated car.
 * @throws {ApiError} - If the car does not exist in the database.
 * @throws {ApiError} - If the car already exists in the database.
 */
const updateCar = async function(carUpdate){
    await getById(carUpdate.id)
    .catch(error => { throw error; });

    return await repositoryCar.updateCar(carUpdate)
    .then(id => {
        if(!id){
            throw new ApiError(400, "Car is not exist");
        }
        return id;
    })
    .catch(error => {
        if (error.code == 23505){ // The code is postgres error code.
            throw new ApiError(400, "Car is already exist");
        }
        throw error;
    });
};

/**
 * Function to delete a car from the database.
 * @param {number} id - The id of the car to delete.
 * @returns {Promise<number>} - A promise that resolves to the id of the deleted car.
 * @throws {ApiError} - If the car does not exist in the database.
 */
const deleteCar = async function(id){
    return await repositoryCar.deleteCar(id)
    .then(id => {
        if(!id){
            throw new ApiError(400, "Car is not exist");
        }
        return id;
    })
    .catch(error => { throw error });
};

module.exports = {
    getAllCars,
    getById,
    createCar,
    updateCar,
    deleteCar,
};