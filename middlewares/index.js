const {validator, playSchema, simSchema, amountSchema} = require('./validation');


const errorHandler = (err, req, res, next) => {
    if (err.isJoi) {
        return res.status(400).json({
            error: 'Bad Request',
            message: err.details[0].message
        });
    }

    console.error(err.stack);

    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
};


module.exports = {errorHandler, validator, playSchema, simSchema, amountSchema};
