const {gameService, walletService} = require('../services');

//TODO reverse walletService on error if necessary
const play = (req, res, next) => {
    try {
        const {bet} = req.body;

        if (bet > walletService.getBalance()) {
            return res.status(400).json({error: 'Insufficient balance'});
        }
        walletService.deductAmount(bet);

        const {matrix, winnings} = gameService.spin(bet);
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

        const {totalWinnings, netResult} = gameService.simulateSpins(count, bet);
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
