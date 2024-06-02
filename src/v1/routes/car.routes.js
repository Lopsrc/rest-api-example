const express = require('express');
const {getAllCars, getById, createCar, updateCar, deleteCar} = require('../../controllers/car.controller');
const validate = require('../../middlewares/validation/car.validation');

const router = express.Router();

router
    .route('/')
    /** GET Method */
    /**
     * @openapi
     * '/api/v1/car':
     *  get:
     *     tags:
     *     - Car
     *     summary: Get all cars.
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    .get(getAllCars)
    /** POST Method */
    /**
     * @openapi
     * '/api/v1/car':
     *  post:
     *     tags:
     *     - Car
     *     summary: Create a car
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - id
     *              - brand
     *              - model
     *              - color
     *              - regNum
     *            properties:
     *              id:
     *                type: integer
     *                description: User id (owner)
     *                default: 1
     *              brand:
     *                type: string
     *                default: 'Volga'
     *              model:
     *                type: string
     *                default: '3102'
     *              color:
     *                type: string
     *                default: 'black'
     *              regNum:
     *                type: string
     *                description: The unique identifier for the car
     *                default: 'P978OP799'
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    .post(validate.createValidationRules(), validate.validation, createCar)
    /** PUT Method */
    /**
     * @openapi
     * '/api/v1/car':
     *  put:
     *     tags:
     *     - Car
     *     summary: Modify a car
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - id
     *              - brand
     *              - model
     *              - color
     *              - regNum
     *            properties:
     *              id:
     *                type: integer
     *                description: Car id
     *                default: 1
     *              brand:
     *                type: string
     *                default: 'Volga'
     *              model:
     *                type: string
     *                default: '3102'
     *              color:
     *                type: string
     *                default: 'black'
     *              regNum:
     *                type: string
     *                description: The unique identifier for the car
     *                default: 'P978OP799'
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    .put(validate.updateValidationRules(), validate.validation, updateCar);

router
    .route('/:id')
    /** GET Method */
    /**
     * @openapi
     * '/api/v1/car/{id}':
     *  get:
     *     tags:
     *     - Car
     *     summary: Get a car by id
     *     parameters:
     *      - name: id
     *        default: 1
     *        in: path
     *        description: The id of the car
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    .get(validate.getValidationRules(), validate.validation, getById)
    /** DELETE Methods */
    /**
     * @openapi
     * '/api/v1/car/{id}':
     *  delete:
     *     tags:
     *     - Car
     *     summary: Delete car by id
     *     parameters:
     *      - name: id
     *        default: 1
     *        in: path
     *        description: The id of the car
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    .delete(validate.deleteValidationRules(), validate.validation, deleteCar);


module.exports = router;