const Joi = require('joi');
const {MIN_BET,MAX_BET,MAX_SIM_COUNT} = require('../config');


const playSchema = Joi.object({
    bet: Joi.number().integer().positive().min(MIN_BET).max(MAX_BET).required()
});

const simSchema = Joi.object({
    count: Joi.number().integer().positive().min(MIN_BET).max(MAX_BET).required(),
    bet: Joi.number().integer().positive().min(1).max(MAX_SIM_COUNT).required()
});

const amountSchema = Joi.object({
    amount: Joi.number().integer().positive().min(1).required(),
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