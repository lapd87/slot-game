const crypto = require('crypto');


const getRandomInRange = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return crypto.randomInt(min, max + 1);
};

const shuffleArrayRandomly = function (unruffledArray) {
    return unruffledArray
        .map(value => ({value, sort: getRandomInRange(0, unruffledArray.length)}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
}


module.exports = {getRandomInRange, shuffleArrayRandomly}
