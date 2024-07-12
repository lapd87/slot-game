const {getRandomInRange, shuffleArrayRandomly} = require("../utils");
const {WIN_MULTIPLIER, WHEELS_COUNT, WHEELS_VISIBLE_POSITIONS, WHEELS_SIZE, UNIQUE_SYMBOLS} = require("../config");


let rtpTotalBets = 0;
let rtpTotalWinnings = 0;
let wheels = [];

const initializeWheels = () => {
    for (let i = 0; i < WHEELS_COUNT; i++) {
        wheels[i] = [];

        const shuffledSymbols = shuffleArrayRandomly(UNIQUE_SYMBOLS);
        for (let j = 0; j < shuffledSymbols.length; j++) {
            wheels[i][j] = shuffledSymbols[j];
        }

        while (wheels[i].length < WHEELS_SIZE) {
            const symbol = UNIQUE_SYMBOLS[getRandomInRange(0, UNIQUE_SYMBOLS.length - 1)];
            wheels[i].push(symbol);
        }

        wheels[i] = shuffleArrayRandomly(wheels[i]);
    }
};

const calculateWinnings = (matrix, bet) => {
    let winnings = 0;

    for (let row of matrix) {
        if (new Set(row).size === 1) {
            winnings += bet * WIN_MULTIPLIER;
        }
    }

    rtpTotalBets += bet;
    rtpTotalWinnings += winnings;

    return winnings;
};

const spin = (bet) => {
    if (wheels.length <= 0) {
        initializeWheels();
    }

    const matrix = [];
    for (let column = 0; column < WHEELS_COUNT; column++) {
        const startIndex = getRandomInRange(0, WHEELS_SIZE - 1);

        for (let row = 0; row < WHEELS_VISIBLE_POSITIONS; row++) {
            if (row === 0) {
                matrix[column] = [];
            }
            matrix[column][row] = wheels[column][(startIndex + row) % WHEELS_SIZE];
        }
    }

    const winnings = calculateWinnings(matrix, bet);

    return {matrix, winnings};
};

const simulateSpins = (count, bet) => {
    let totalWinnings = 0;

    for (let i = 0; i < count; i++) {
        const {winnings} = spin(bet);
        totalWinnings += winnings;
    }

    const netResult = totalWinnings - (count * bet);

    return {totalWinnings, netResult};
};

const getRTP = () => {
    const rtp = (rtpTotalWinnings / rtpTotalBets) * 100 || 0;

    return Math.round(rtp * 100 + Number.EPSILON) / 100
};


module.exports = {spin, simulateSpins, getRTP};