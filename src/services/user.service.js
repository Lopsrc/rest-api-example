const Repository = require('../database/postgres/user.db');
const ApiError = require('../pkg/error');

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws {ApiError} If no users are found in the database.
 */
const getAllUsers = async function(){
    return await Repository.getAllUsers()
    .then(users => {
        if (users.length == 0){
            throw new ApiError(400, "users are not exist");
        }
        return users;
    })
    .catch(error => { throw error; });
};


/**
 * Retrieves a user by their email from the database.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to a user object.
 * @throws {ApiError} If no user is found with the given email.
 */
const getByEmail = async function(email) {
    return await Repository.getByEmail(email)
    .then(user => {
        if (!user){
            throw new ApiError(400, "User is not exist");
        }
        return user;
    })
    .catch(error => { throw error; });
};


/**
 * Creates a new user in the database.
 * @param {Object} newUser - The user object to create.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly created user.
 * @throws {ApiError} If a user with the same email already exists.
 */
const createUser = async function(newUser) {
    return await Repository.createUser(newUser)
    .then(id => id)
    .catch(error => {
        if (error.code == 23505){ // The code is postgres error code.
            throw new ApiError(400, "User is already exist");
        }
        throw error;
    });
};


/**
 * Updates an existing user in the database.
 * @param {Object} userUpdate - The user object with updated information.
 * @returns {Promise<number>} A promise that resolves to the ID of the updated user.
 * @throws {ApiError} If no user is found with the given email.
 */
const updateUser = async function(userUpdate){
    await getByEmail(userUpdate.email)
    .catch(error => { throw error; });

    return await Repository.updateUser(userUpdate)
    .then(id => {
        if(!id){
            throw new ApiError(400, "User is not exist");
        }
        return id;
    })
    .catch(error => { throw error; });
};


/**
 * Deletes a user from the database.
 * @param {string} email - The email of the user to delete.
 * @returns {Promise<number>} A promise that resolves to the ID of the deleted user.
 * @throws {ApiError} If no user is found with the given email.
 */
const deleteUser = async function(email){
    await getByEmail(email)
    .catch(error => { throw error; });

    return await Repository.deleteUser(email)
    .then(id => {
        if(!id){
            throw new ApiError(400, "User is not exist");
        }
        return id;
    })
    .catch(error => { throw error; });
};


/**
 * Recovers a user from the database.
 * @param {string} email - The email of the user to recover.
 * @returns {Promise<number>} A promise that resolves to the ID of the recovered user.
 * @throws {ApiError} If no user is found with the given email.
 */
const recoveryUser = async function(email){
    await getByEmail(email)
    .catch(error => { throw error; });

    return await Repository.recoveryUser(email)
    .then(id => {
        if(!id){
            throw new ApiError(400, "User is not exist");
        }
        return id;
    })
    .catch(error => { throw error; });
};

module.exports = {
    getAllUsers,
    getByEmail,
    createUser,
    updateUser,
    deleteUser,
    recoveryUser,
};