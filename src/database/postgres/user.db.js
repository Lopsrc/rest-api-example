const pool = require("../../pkg/clients/postgres/client");

const getAllUsers = async () => {
    const query = "SELECT * FROM person ORDER BY id DESC";
    return (await pool.query(query)).rows;
};

const getByEmail = async (email) => {
    const query = "SELECT * FROM person WHERE email = $1";
    return (await pool.query(query, [email])).rows[0];
};

const getById = async (id) => {
    const query = "SELECT * FROM person WHERE id = $1";
    return (await pool.query(query, [id])).rows[0];
};

const createUser = async (newUser) => {
    const query = "INSERT INTO person (name, email, age) VALUES ($1, $2, $3) RETURNING id";
    return (await pool.query(query, [newUser.name, newUser.email, newUser.age])).rows[0];
};

const updateUser = async (user) => {
    const query = "UPDATE person SET name = $1, age = $2 WHERE email = $3 RETURNING id";
    return (await pool.query(query, [user.name, user.age, user.email])).rows[0];
}

const deleteUser = async (email) => {
    const query = "UPDATE person SET del = $1 WHERE email = $2 RETURNING id";
    return (await pool.query(query, [true, email])).rows[0];
}

const recoveryUser = async (email) => {
    const query = "UPDATE person SET del = $1 WHERE email = $2 RETURNING id";
    return (await pool.query(query, [false, email])).rows[0];
}

module.exports = { 
    getAllUsers,
    getByEmail,
    getById,
    createUser,
    updateUser,
    deleteUser,
    recoveryUser,
};