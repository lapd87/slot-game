require("dotenv").config();
const express = require('express');
const {gameRouter, walletRouter} = require('./routes');
const setupSwagger = require('./swagger');
const {errorHandler} = require('./middlewares');
const {PORT} = require('./config');


const app = express();

app.use(express.json());

app.use(gameRouter);
app.use(walletRouter);

setupSwagger(app);

app.use(errorHandler);


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason, 'Unhandled Rejection at Promise', promise);
}).on('uncaughtException', error => {
    console.error(error, 'Uncaught Exception thrown');
    process.exit(1);
});


module.exports = app;