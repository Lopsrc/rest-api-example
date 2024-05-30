var randomEmail = require('random-email');
var random = require('random-name')

const createUser = {
    name: random(),
    email: randomEmail({domain: 'example.com'}),
    age: 21
}

const updateUser = {
    name: random(),
    email: createUser.email,
    age: 32
}

module.exports = {
    createUser,
    updateUser,
}