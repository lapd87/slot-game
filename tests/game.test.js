const chai = require('chai');
const {
    WIN_MULTIPLIER,
    WHEELS_COUNT,
    WHEELS_VISIBLE_POSITIONS,
    WHEELS_SIZE,
    UNIQUE_SYMBOLS
} = require("../config");
const {gameService, resetDB} = require('../services');
const {spin, getRTP, initializeWheels, calculateWinnings} = gameService;
const {expect} = chai;


//Testing gameService functions
describe('Game Service Functions', () => {
    const RANDOM_ITERATIONS = 10;

    //Testing calculateWinnings
    it('calculateWinnings should have 1st row winnings', () => {
        const matrix = [
            ['1', '1', '1'],
            ['4', '5', '6'],
            ['7', '7', '9']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have 2nd row winnings', () => {
        const matrix = [
            ['1', '1', '3'],
            ['5', '5', '5'],
            ['7', '9', '9']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have 3rd row winnings', () => {
        const matrix = [
            ['12', '1', '1'],
            ['4', '5', '6'],
            ['7', '7', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have 2 row winnings', () => {
        const matrix = [
            ['1', '1', '1'],
            ['4', '5', '6'],
            ['7', '7', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(2 * bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have 2 row winnings', () => {
        const matrix = [
            ['1', '1', '2'],
            ['5', '5', '5'],
            ['7', '7', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(2 * bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have 2 row winnings', () => {
        const matrix = [
            ['1', '1', '1'],
            ['6', '6', '6'],
            ['7', '8', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(2 * bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have 3 row winnings', () => {
        const matrix = [
            ['1', '1', '1'],
            ['4', '4', '4'],
            ['7', '7', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(3 * bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have 1 row mixed symbols winnings', () => {
        const matrix = [
            ['ヅ', 'ヅ', 'ヅ'],
            [5, '5', 5],
            ['7', 7, '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should have no winnings', () => {
        const matrix = [
            ['ヅ', 'ヅ', 'ッ'],
            ['4', '5', '6'],
            ['7', '8', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(0);
    });

    it('calculateWinnings should work with other matrices and have 1 row winnings', () => {
        const matrix = [
            ['ヅ', 'ヅ', 'ッ'],
            ['4', '5', '6'],
            ['4', '5', '6'],
            ['7', '7', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(bet * WIN_MULTIPLIER);
    });

    it('calculateWinnings should work with other matrices and have 1 row winnings', () => {
        const matrix = [
            ['ヅ', 'ヅ', 'ッ', '1'],
            ['4', '5', '6', 'a'],
            ['7', '7', '7', '7']
        ];
        const bet = 10;

        const result = calculateWinnings(matrix, bet);
        expect(result).to.be.equal(bet * WIN_MULTIPLIER);
    });

    //Testing initializeWheels
    it('initializeWheels should have correct wheels', () => {
        let iterations = RANDOM_ITERATIONS;

        while (iterations-- > 0) {
            const wheels = initializeWheels();
            expect(wheels.length).to.equal(WHEELS_COUNT);

            for (let i = 0; i < wheels.length; i++) {
                const currentWheel = wheels[i];
                expect(currentWheel.length).to.equal(WHEELS_SIZE);
                expect(new Set(currentWheel).size).to.equal(UNIQUE_SYMBOLS.length);
            }
        }
    });

    //Testing spin
    it('spin should have correct matrix size', () => {
        const {matrix} = spin();
        expect(matrix.length).to.equal(WHEELS_COUNT);

        for (let i = 0; i < matrix.length; i++) {
            expect(matrix[i].length).to.equal(WHEELS_VISIBLE_POSITIONS);
        }
    });


    //Testing getRTP
    it('getRTP should have max 2 decimal signs', () => {
        const rtp = getRTP().toString();

        const decimalSignIndexFromEnd = rtp.length - rtp.indexOf(".");
        expect(decimalSignIndexFromEnd).to.be.lessThanOrEqual(3);
    });

    it('getRTP should initially be 0', () => {
        resetDB();

        expect(getRTP()).to.equal(0);
    });


    //Reset DB/local variables to initial state
    after((done) => {
        resetDB();
        done();
    });
});