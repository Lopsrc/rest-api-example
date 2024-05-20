const ApiError = require("../../utils/error");

const getUser = (email) => {
    if (!email) {
        throw new ApiError(400, "invalid credentials."); 
    }
    return;
}

const createUser = (body) => {
    if (
        !body.name || !body.email || !body.age 
    ) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

const updateUser = (body) => {
    if (
        !body.name || !body.email || !body.age
    ) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

const deleteUser = (email) => {
    if (!email) {
        throw new ApiError(400, "email is not valid.");
    }
    return;
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
};