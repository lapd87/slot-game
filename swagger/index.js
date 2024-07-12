const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {PORT} = require('../config');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Slot Casino Game API',
            version: '1.0.0',
            description: 'A simple 3x3 slot casino game backend',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


module.exports = setupSwagger;