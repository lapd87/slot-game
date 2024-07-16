require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MIN_BET: parseInt(process.env.MIN_BET) || 1,
    MAX_BET: parseInt(process.env.MAX_BET) || 10000,
    MIN_AMOUNT_TRANSFER: parseInt(process.env.MIN_AMOUNT_TRANSFER) || 1,
    MAX_SIM_COUNT: parseInt(process.env.MAX_SIM_COUNT) || 1000,
    WIN_MULTIPLIER: parseInt(process.env.WIN_MULTIPLIER) || 5,
    WHEELS_COUNT: parseInt(process.env.WHEELS_COUNT) || 3,
    WHEELS_VISIBLE_POSITIONS: parseInt(process.env.WHEELS_VISIBLE_POSITIONS) || 3,
    WHEELS_SIZE: parseInt(process.env.WHEELS_SIZE) || 30,
    UNIQUE_SYMBOLS: ["1", "2", "3", "4", "5"]
};
