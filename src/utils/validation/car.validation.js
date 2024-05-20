const ApiError = require("../../utils/error");

const getCar = (id) => {
    if (!id) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

const createCar = (body) => {
    if (
        !body.id    || !body.brand || !body.model ||
        !body.color || !body.regNum 
    ) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

const updateCar = (body) => {
    if (
        !body.id    || !body.brand || !body.model ||
        !body.color || !body.regNum 
    ) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

const deleteCar = (id) => {
    if (!id) {
        throw new ApiError(400, "invalid credentials.");
    }
    return;
}

module.exports = {
    getCar,
    createCar,
    updateCar,
    deleteCar,
};