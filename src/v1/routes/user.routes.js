const express = require('express');
const {getAllUsers, getByEmail, createUser, updateUser, deleteUser, recoveryUser} = require('../../controllers/user.controller');
const validate = require('../../middlewares/validation/user.validation');

const router = express.Router();

router
    .route('/')
    /** GET Method */
    /**
     * @openapi
     * '/api/v1/user':
     *  get:
     *     tags:
     *     - User
     *     summary: Get all users.
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
    .get(getAllUsers)
    /** POST Method */
    /**
     * @openapi
     * '/api/v1/user':
     *  post:
     *     tags:
     *     - User
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - name
     *              - email
     *              - age
     *            properties:
     *              name:
     *                type: string
     *                default: Ivan 
     *              email:
     *                type: string
     *                default: ivan@mail.com
     *              age:
     *                type: integer
     *                default: 22
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
    .post(validate.createValidationRules(), validate.validation, createUser)
    /** PUT Method */
    /**
     * @openapi
     * '/api/v1/user':
     *  put:
     *     tags:
     *     - User
     *     summary: Modify a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *            properties:
     *              email:
     *                type: string
     *                default: 'ivan@mail.com'
     *              name:
     *                type: string
     *                default: 'Masha'
     *              age:
     *                type: integer
     *                default: 30
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
    .put(validate.updateValidationRules(), validate.validation, updateUser);

router
    .route('/:email')
    /** GET Method */
    /**
     * @openapi
     * '/api/v1/user/{email}':
     *  get:
     *     tags:
     *     - User
     *     summary: Get a user by email
     *     parameters:
     *      - name: email
     *        default: ivan@mail.com
     *        in: path
     *        description: The email of the user
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
    .get(validate.getValidationRules(), validate.validation ,getByEmail)
    /** DELETE Methods */
    /**
     * @openapi
     * '/api/v1/user/{email}':
     *  delete:
     *     tags:
     *     - User
     *     summary: Delete user by email (soft)
     *     parameters:
     *      - name: email
     *        default: ivan@mail.com
     *        in: path
     *        description: The unique email of the user
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
    .delete(validate.deleteValidationRules(), validate.validation, deleteUser)
    /** PUT Method */
    /**
     * @openapi
     * '/api/v1/user/{email}':
     *  put:
     *     tags:
     *     - User
     *     summary: Recovery a user
     *     parameters:
     *      - name: email
     *        default: ivan@mail.com
     *        in: path
     *        description: The unique email of the user
     *        required: true
     *     responses:
     *      200:
     *        description: Recovered
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    .put(validate.recoveryValidationRules(), validate.validation, recoveryUser);


module.exports = router;