const express = require('express');
const {getAllCars, getById, createCar, updateCar, deleteCar} = require('../../controllers/car.controller');

const router = express.Router();

router
    .route('/')
    .get(getAllCars)
    .post(createCar)
    .put(updateCar);

router
    .route('/:id')
    .get(getById)
    .delete(deleteCar);


module.exports = router;