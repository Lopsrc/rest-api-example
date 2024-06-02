const service = require('../services/car.service');
const ApiError = require('../pkg/error');
const logger = require('../pkg/logger');

/**
 * Fetches all cars from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getAllCars = async function(req, res) {
    logger.info('Get all cars');

    await service.getAllCars()
    .then(cars => res.send({status: 200, data: cars}))
    .catch(error => {
        logger.error(error.message);
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

/**
 * Fetches a car by its ID from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getById = async function(req, res) {
    logger.info('Get one car');

    const {id} = req.params;

    await service.getById(id)
    .then(car => res.send({ status: 'OK', data: car }))
    .catch((error) => { 
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

/**
 * Creates a new car in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createCar = async function(req, res) {
    logger.info('Create new car');

    const {body} = req;

    await service.createCar({
        id: body.id,
        brand: body.brand,
        model: body.model,
        color: body.color,
        regNum: body.regNum,
    })
    .then(id => res.status(201).send({status: 'OK', data: id}))
    .catch(error => {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

/**
 * Updates an existing car in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const updateCar = async function(req, res) {
    logger.info('Update one car');

    const {body} = req;

    await service.updateCar({
        id: body.id,
        brand: body.brand,
        model: body.model,
        color: body.color,
        regNum: body.regNum,
    })
    .then(id => res.send({status:'OK', data: id}))
    .catch(error => {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

/**
 * Deletes a car from the database by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const deleteCar = async function(req, res) {
    logger.info('Delete one car');

    const {params: {id}} = req;

    await service.deleteCar(id)
    .then(() => res.send({status:'OK', isDel: true}))
    .catch(error => {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

module.exports = {
    getAllCars,
    getById,
    createCar,
    updateCar,
    deleteCar,
};