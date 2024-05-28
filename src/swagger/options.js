
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            description: "API endpoints for a CRUD documented on swagger",
            contact: {
                name: "Lopsrc",
                email: "serpan2002@mail.ru",
                url: "https://github.com/Lopsrc/rest-api-js"
            },
            version: '1.0.0',
        },
        servers: [
        {
            url: "http://localhost:3000/",
            description: "Local server"
        },
        ]
    },
    apis: ['src/v1/routes/user.routes.js', 'src/v1/routes/car.routes.js'],
}

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;