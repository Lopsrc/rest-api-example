const Repository = require('../database/postgres/user.db');
const ApiError = require('../pkg/error');

/**
 * Function to get all users from the database.
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
 * @throws {ApiError} - If there are no users in the database.
 */
const getAllUsers = async function(){
    try {
        const users = await Repository.getAllUsers();
        if (users.length == 0){
            throw new ApiError(400, "users are not exist");
        }
        return users;
    } catch (error) {
        throw error;
    }
};

/**
 * Function to get a user by email from the database.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to a user object.
 * @throws {ApiError} - If the user does not exist in the database.
 */
const getByEmail = async function(email) {
    try {
        const user = await Repository.getByEmail(email);
        if (!user){
            throw new ApiError(400, "User is not exist");
        }
        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * Function to create a new user in the database.
 * @param {Object} newUser - The new user object to create.
 * @returns {Promise<number>} - A promise that resolves to the id of the newly created user.
 * @throws {ApiError} - If the user already exists in the database.
 */
const createUser = async function(newUser) {
    try {        
        return await Repository.createUser(newUser);
    } catch (error) {
        if (error.code == 23505){ // The code is postgres error code.
            throw new ApiError(400, "User is already exist");
        }
        throw error;
    } 
};

/**
 * Function to update an existing user in the database.
 * @param {Object} userUpdate - The updated user object.
 * @returns {Promise<number>} - A promise that resolves to the id of the updated user.
 * @throws {ApiError} - If the user does not exist in the database.
 */
const updateUser = async function(userUpdate){
    try {
        await getByEmail(userUpdate.email);

        const id = await Repository.updateUser(userUpdate);
        if (!id){
            throw new ApiError(400, "User is not exist");
        }

        return id;
    } catch (error) {
        throw error;
    }              
};

/**
 * Function to delete a user from the database.
 * @param {string} email - The email of the user to delete.
 * @returns {Promise<number>} - A promise that resolves to the id of the deleted user.
 * @throws {ApiError} - If the user does not exist in the database.
 */
const deleteUser = async function(email){
    try {
        await getByEmail(email);
        return await Repository.deleteUser(email);
    } catch (error) {
        throw error;
    }
};

/**
 * Function to recover a user in the database.
 * @param {string} email - The email of the user to recover.
 * @returns {Promise<number>} - A promise that resolves to the id of the recovered user.
 * @throws {ApiError} - If the user does not exist in the database.
 */
const recoveryUser = async function(email){
    try {
        await getByEmail(email);
        return await Repository.recoveryUser(email);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getByEmail,
    createUser,
    updateUser,
    deleteUser,
    recoveryUser,
};