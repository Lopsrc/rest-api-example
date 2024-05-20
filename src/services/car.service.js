const repositoryUser = require('../database/postgres/user.db');
const repositoryCar = require('../database/postgres/car.db');
const ApiError = require('../utils/error');

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

const createCar = async function(newCar) {
    console.log('createNewUser');
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