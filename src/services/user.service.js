const Repository = require('../database/postgres/user.db');
const ApiError = require('../utils/error');

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

const createUser = async function(newUser) {
    try {        
        return await Repository.createUser(newUser);
    } catch (error) {
        console.log(error)
        if (error.code == 23505){ // The code is postgres error code.
            throw new ApiError(400, "User is already exist");
        }
        throw error;
    } 
};

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

const deleteUser = async function(email){
    try {
        await getByEmail(email);
        return await Repository.deleteUser(email);
    } catch (error) {
        throw error;
    }
};

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