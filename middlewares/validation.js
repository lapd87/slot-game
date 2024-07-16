const Joi = require('joi');
const {MIN_BET,MAX_BET,MAX_SIM_COUNT, MIN_AMOUNT_TRANSFER} = require('../config');


const playSchema = Joi.object({
    bet: Joi.number().integer().strict().positive().min(MIN_BET).max(MAX_BET).required()
});

const simSchema = Joi.object({
    count: Joi.number().integer().strict().positive().min(1).max(MAX_SIM_COUNT).required(),
    bet: Joi.number().integer().strict().positive().min(MIN_BET).max(MAX_BET).required()
});

const amountSchema = Joi.object({
    amount: Joi.number().integer().strict().positive().min(MIN_AMOUNT_TRANSFER).required(),
});

const validator = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
        return next(error);
    }

    next();
};


module.exports = {
    validator,
    playSchema,
    simSchema,
    amountSchema,
}