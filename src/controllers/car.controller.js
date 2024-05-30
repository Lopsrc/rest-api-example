const service = require('../services/car.service');
const validate = require('../middlewares/validation/car.validation');
const ApiError = require('../pkg/error');
const logger = require('../pkg/logger');

/**
 * Fetches all cars from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getAllCars = async function(req, res) {
    try {
        logger.info('Get all cars');

        const cars = await service.getAllCars();

        res.send({status: 200, data: cars});
    } catch (error) {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error.message || "internal error" },
        });
    }
};

/**
 * Fetches a car by its ID from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getById = async function(req, res) {
    try {
        logger.info('Get one car');

        const {id} = req.params;
        const err = validate.getCar(id)
        if (err) {
            throw new ApiError(400, "invalid credentials");
        }

        const car = await service.getById(id);

        res.send({ status: 'OK', data: car });
    } catch (error) {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

/**
 * Creates a new car in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createCar = async function(req, res) {
    try {
        logger.info('Create new car');

        const {body} = req;
        const err =  validate.createCar(body);
        if (err) {
            throw new ApiError(400, "invalid credentials");
        }

        const id = await service.createCar({
            id: body.id,
            brand: body.brand,
            model: body.model,
            color: body.color,
            regNum: body.regNum,
        });

        res.status(201).send({status: 'OK', data: id});
    } catch (error) {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

/**
 * Updates an existing car in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const updateCar = async function(req, res) {
    try {
        logger.info('Update one car');

        const {body} = req;
        const err = validate.updateCar(body);
        if (err) {
            throw new ApiError(400, "invalid credentials");
        }

        const updateCar = await service.updateCar({
            id: body.id,
            brand: body.brand,
            model: body.model,
            color: body.color,
            regNum: body.regNum,
        });

        res.send({status:'OK', data: updateCar});
    } catch (error) {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

/**
 * Deletes a car from the database by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const deleteCar = async function(req, res) {
    try {
        logger.info('Delete one car');

        const {params: {id}} = req;
        const err =  validate.deleteCar(id);
        if (err) {
            throw new ApiError(400, "invalid credentials");
        }

        await service.deleteCar(id);

        res.send({status:'OK', isDel: true});
    } catch (error) {
        logger.error(error.message);

        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

module.exports = {
    getAllCars,
    getById,
    createCar,
    updateCar,
    deleteCar,
};