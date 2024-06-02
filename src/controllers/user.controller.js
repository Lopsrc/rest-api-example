const service = require('../services/user.service');
const logger = require('../pkg/logger');

/**
 * Fetch all users from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getAllUsers = async function(req, res) {
    await service.getAllUsers()
    .then(users => res.send({status: 200, data: users}))
    .catch(error => {
        logger.error(error.message);
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    })
};

/**
 * Fetch a user by email from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getByEmail = async function(req, res) {
    logger.info('Get one user');
    const {email} = req.params;

    await service.getByEmail(email)
    .then(user => res.send({ status: 'OK', data: user }))
    .catch(error => {
        logger.error(error.message);
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

/**
 * Create a new user in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const createUser = async function(req, res) {
    logger.info('Create new user');
    const {body} = req;

    await service.createUser({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        age: body.age,
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
 * Update an existing user in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const updateUser = async function(req, res) {
    logger.info('Update one user');
    const {body} = req;

    await service.updateUser({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        age: body.age,
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
 * Delete a user from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const deleteUser = async function(req, res) {
    logger.info('Delete one user');
    const {params: {email}} = req;

    await service.deleteUser(email)
    .then(() => res.send({status:'OK', isDel: true}))
    .catch(error => {
        logger.error(error.message);
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

/**
 * Recover a deleted user from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const recoveryUser = async function(req, res) {
    logger.info('Recover one user');
    const {params: {email}} = req;

    await service.recoveryUser(email)
    .then(() => res.send({status:'OK', isRec: true}))
    .catch(error => {
        logger.error(error.message);
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: error?.message || error,
        });
    });
};

module.exports = {
    getAllUsers,
    getByEmail,
    createUser,
    updateUser,
    deleteUser,
    recoveryUser,
};