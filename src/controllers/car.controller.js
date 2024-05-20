const service = require('../services/car.service');
const validate = require('../utils/validation/car.validation');
const ApiError = require('../utils/error');
const logger = require('../utils/logger');

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

const getById = async function(req, res) {
    try {
        logger.info('Get one car');

        const {id} = req.params;
        const err = validate.getCar(id)
        if (err) {
            throw new ApiError(400, "invalid credentials");
        }

        const car = await service.getById(id);

        res.send({ status: 'OK', car: car });
    } catch (error) {
        logger.error(error.message);

        res.status(error?.statusCode || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

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

        res.send({status: 'OK', id: id});
    } catch (error) {
        logger.error(error.message);

        res.status(error?.statusCode || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

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

        res.status(error?.statusCode || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

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

        res.status(error?.statusCode || 500).send({
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