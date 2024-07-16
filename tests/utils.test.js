const chai = require('chai');
const {UNIQUE_SYMBOLS} = require("../config");
const {getRandomInRange, shuffleArrayRandomly} = require('../utils');
const {expect} = chai;


//Testing utils functions
describe('Utils Functions', () => {
    const RANDOM_ITERATIONS = 10;

    //Testing getRandomInRange
    it('getRandomInRange should get random number', () => {
        let iterations = RANDOM_ITERATIONS;

        while (iterations-- > 0) {
            const min = 0;
            const max = 10;

            const result = getRandomInRange(min, max);
            expect(result).to.be.greaterThanOrEqual(min).and.to.be.lessThanOrEqual(max);
        }
    });

    it('getRandomInRange should get 1', () => {
        let iterations = RANDOM_ITERATIONS;

        while (iterations-- > 0) {
            const min = 1;
            const max = 1;

            const result = getRandomInRange(min, max);
            expect(result).to.be.equal(min).and.to.be.equal(max);
        }
    });

    it('getRandomInRange should get random number from float', () => {
        let iterations = RANDOM_ITERATIONS;

        while (iterations-- > 0) {
            const min = 0.9;
            const max = 10.1;

            const result = getRandomInRange(min, max);
            expect(result).to.be.greaterThanOrEqual(min).and.to.be.lessThanOrEqual(max);
        }
    });

    it('getRandomInRange should get random number from min to max supported range', () => {
        let iterations = RANDOM_ITERATIONS;

        while (iterations-- > 0) {
            const min = Number.MIN_SAFE_INTEGER;
            const max = min + 281474976710655 - 1;//max supported range

            const result = getRandomInRange(min, max);
            expect(result).to.be.greaterThanOrEqual(min).and.to.be.lessThanOrEqual(max);
        }
    });

    it('getRandomInRange should get random number to max from supported range', () => {
        let iterations = RANDOM_ITERATIONS;

        while (iterations-- > 0) {
            const max = Number.MAX_SAFE_INTEGER - 1;
            const min = max - 281474976710655 + 1;//max supported range

            const result = getRandomInRange(min, max);
            expect(result).to.be.greaterThanOrEqual(min).and.to.be.lessThanOrEqual(max);
        }
    });

    it('getRandomInRange outside of range should throw', () => {
        const min = Number.MIN_SAFE_INTEGER;
        const max = min + 281474976710655;//max supported range

        expect(() => getRandomInRange(min, max))
            .to.throw('The value of "max - min" is out of range. It must be <= 281474976710655. Received 281_474_976_710_656');
    });

    it('getRandomInRange max undefined should throw error', () => {
        const min = 1;
        const max = undefined;

        expect(() => getRandomInRange(min, max))
            .to.throw('The "max" argument must be a safe integer. Received type number (NaN)');
    });

    it('getRandomInRange min undefined should throw error', () => {
        const min = undefined;
        const max = 1;

        expect(() => getRandomInRange(min, max))
            .to.throw('The "min" argument must be a safe integer. Received type number (NaN)');
    });

    it('getRandomInRange max string should throw error', () => {
        const min = 1;
        const max = "a";

        expect(() => getRandomInRange(min, max))
            .to.throw('The "max" argument must be a safe integer. Received type number (NaN)');
    });

    it('getRandomInRange min string should throw error', () => {
        const min = "a";
        const max = 10;

        expect(() => getRandomInRange(min, max))
            .to.throw('The "min" argument must be a safe integer. Received type number (NaN)');
    });

    it('getRandomInRange wrong min/max should throw error', () => {
        const min = 10;
        const max = 1;

        expect(() => getRandomInRange(min, max))
            .to.throw('The value of "max" is out of range. It must be greater than the value of "min"');
    });

    it('getRandomInRange should have normal distribution', () => {
        //TODO how to check randomness
        const min = 1;
        const max = 100;
        let iterations = (max - min + 1) * 10000;

        const randomNumbersMap = {};
        for (let i = 0; i < iterations; i++) {

            const currentRandomNumber = getRandomInRange(min, max);

            randomNumbersMap[currentRandomNumber] = (randomNumbersMap[currentRandomNumber] || 0) + 1;
        }

        const orderedByOccurrence = Object.values(randomNumbersMap).sort((a, b) => b - a);

        const maxDifference = orderedByOccurrence[0] - orderedByOccurrence[orderedByOccurrence.length - 1];

        const perfectOccurrenceCount = iterations / (max - min + 1);

        expect(maxDifference / perfectOccurrenceCount * 100).to.be.lessThan(10);
    });

    //Testing shuffleArrayRandomly
    it('shuffleArrayRandomly should return shuffled array', () => {
        let iterations = RANDOM_ITERATIONS;

        while (iterations-- > 0) {

            const shuffledArray = shuffleArrayRandomly(UNIQUE_SYMBOLS);

            expect(shuffledArray.length).to.equal(UNIQUE_SYMBOLS.length);
            expect(new Set(shuffledArray).size).to.equal(new Set(UNIQUE_SYMBOLS).size);

            //TODO random sort can equal initial!!!
            //let differenceCount = 0;
            // for (let i = 0; i < shuffledArray.length; i++) {
            //     if (shuffledArray[i] !== UNIQUE_SYMBOLS[i]) {
            //         differenceCount++;
            //     }
            // }
            //
            // expect(differenceCount).to.be.greaterThanOrEqual(2)
            //     .and.to.be.lessThanOrEqual(UNIQUE_SYMBOLS.length);
        }
    });
});
