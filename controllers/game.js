const {gameService, walletService} = require('../services');


const play = (req, res, next) => {
    try {
        const {bet} = req.body;

        if (bet > walletService.getBalance()) {
            return res.status(400).json({error: 'Insufficient balance'});
        }
        walletService.deductAmount(bet);

        let playResult;
        try {
            playResult = gameService.spin(bet);
        } catch (error) {
            walletService.addAmount(bet); // revert bet amount
            return next(error);
        }

        const {matrix, winnings} = playResult;
        walletService.addAmount(winnings);

        res.json({matrix, winnings});
    } catch (err) {
        next(err);
    }
};

const sim = (req, res, next) => {
    try {
        const {count, bet} = req.body;

        if (count * bet > walletService.getBalance()) {
            return res.status(400).json({error: 'Insufficient balance'});
        }
        walletService.deductAmount(count * bet);

        let simResult;
        try {
            simResult = gameService.simulateSpins(count, bet);
        } catch (error) {
            walletService.addAmount(count * bet); // revert bet amount
            return next(error);
        }

        const {totalWinnings, netResult} = simResult;
        walletService.addAmount(totalWinnings);

        res.json({totalWinnings, netResult});
    } catch (err) {
        next(err);
    }
};

const rtp = (req, res, next) => {
    try {
        const rtpPercentage = gameService.getRTP();
        res.json({rtp: rtpPercentage});
    } catch (err) {
        next(err);
    }
};


module.exports = {play, sim, rtp};
