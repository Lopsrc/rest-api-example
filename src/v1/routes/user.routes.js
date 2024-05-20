const express = require('express');
const {getAllUsers, getByEmail, createUser, updateUser, deleteUser, recoveryUser} = require('../../controllers/user.controller');

const router = express.Router();

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    .put(updateUser);

router
    .route('/:email')
    .get(getByEmail)
    .delete(deleteUser)
    .put(recoveryUser);


module.exports = router;