const pool = require("../../pkg/clients/postgres/client");

/**
 * Retrieves all users from the database sorted by id in descending order.
 * @returns {Promise<Object[]>} An array of user objects.
 */
const getAllUsers = async () => {
    const query = "SELECT * FROM person ORDER BY id DESC";
    return await pool.query(query)
    .then(rows => rows.rows)
    .catch(error => { throw error; });
};

/**
 * Retrieves a user by their email from the database.
 * @param {string} email The email of the user to retrieve.
 * @returns {Promise<Object|null>} A user object or null if not found.
 */
const getByEmail = async (email) => {
    const query = "SELECT * FROM person WHERE email = $1";
    return await pool.query(query, [email])
    .then(rows => rows.rows[0])
    .catch(error => { throw error; });
};

/**
 * Retrieves a user by their id from the database.
 * @param {number} id The id of the user to retrieve.
 * @returns {Promise<Object|null>} A user object or null if not found.
 */
const getById = async (id) => {
    const query = "SELECT * FROM person WHERE id = $1";
    return await pool.query(query, [id])
    .then(rows => rows.rows[0])
    .catch(error => { throw error; });
};

/**
 * Creates a new user in the database.
 * @param {Object} newUser The new user object to create.
 * @param {string} newUser.name The name of the user.
 * @param {string} newUser.email The email of the user.
 * @param {number} newUser.age The age of the user.
 * @returns {Promise<Object>} The created user object with the id.
 */
const createUser = async (newUser) => {
    const query = "INSERT INTO person (name, email, age) VALUES ($1, $2, $3) RETURNING id";
    return await pool.query(query, [newUser.name, newUser.email, newUser.age])
    .then(rows => rows.rows[0])
    .catch(error => { throw error; });
};

/**
 * Updates an existing user in the database.
 * @param {Object} user The user object to update.
 * @param {string} user.name The new name of the user.
 * @param {number} user.age The new age of the user.
 * @param {string} user.email The email of the user to update.
 * @returns {Promise<Object>} The updated user object with the id.
 */
const updateUser = async (user) => {
    const query = "UPDATE person SET name = $1, age = $2 WHERE email = $3 RETURNING id";
    return await pool.query(query, [user.name, user.age, user.email])
    .then(rows => rows.rows[0])
    .catch(error => { throw error; })
};

/**
 * Deletes a user from the database by marking them as deleted.
 * @param {string} email The email of the user to delete.
 * @returns {Promise<Object>} The deleted user object with the id.
 */
const deleteUser = async (email) => {
    const query = "UPDATE person SET del = $1 WHERE email = $2 RETURNING id";
    return await pool.query(query, [true, email])
    .then(rows => rows.rows[0])
    .catch(error => { throw error; });
};

/**
 * Recovers a deleted user from the database by marking them as not deleted.
 * @param {string} email The email of the user to recover.
 * @returns {Promise<Object>} The recovered user object with the id.
 */
const recoveryUser = async (email) => {
    const query = "UPDATE person SET del = $1 WHERE email = $2 RETURNING id";
    return await pool.query(query, [false, email])
    .then(rows => rows.rows[0])
    .catch(error => { throw error; });
};

module.exports = { 
    getAllUsers,
    getByEmail,
    getById,
    createUser,
    updateUser,
    deleteUser,
    recoveryUser,
};