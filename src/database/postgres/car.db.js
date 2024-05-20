const pool = require("../../pkg/clients/postgres/client");

const getAllcars = async () => {
    const query = "SELECT * FROM car ORDER BY id DESC";
    return (await pool.query(query)).rows;
};

const getById = async (id) => {
    const query = "SELECT * FROM car WHERE id = $1";
    return (await pool.query(query, [id])).rows[0];
};

const createCar = async (car) => {
    const query = "INSERT INTO car (brand, model, color, reg_num, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    return (await pool.query(query, [car.brand, car.model, car.color, car.regNum, car.id])).rows[0].id;
};

const updateCar = async (car) => {
    const query = "UPDATE car SET brand = $1, model = $2, color = $3, reg_num = $4 WHERE id = $5 RETURNING id";
    return (await pool.query(query, [car.brand, car.model, car.color, car.regNum, car.id])).rows[0].id;
}

const deleteCar = async (id) => {
    const query = "DELETE FROM car WHERE id = $1 RETURNING id";
    return (await pool.query(query, [id])).rows[0];
}

module.exports = { 
    getAllcars,
    getById,
    createCar,
    updateCar,
    deleteCar,
};