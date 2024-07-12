const {walletService} = require('../services');


const deposit = (req, res, next) => {
    try {
        const {amount} = req.body;

        const totalBalance = walletService.addAmount(amount);

        res.json({totalBalance});
    } catch (err) {
        next(err);
    }
};

const withdraw = (req, res, next) => {
    try {
        const {amount} = req.body;

        if (amount > walletService.getBalance()) {
            return res.status(400).json({error: 'Insufficient balance'});
        }

        const totalBalance = walletService.deductAmount(amount);

        res.json({totalBalance});
    } catch (err) {
        next(err);
    }
};

const balance = (req, res, next) => {
    try {
        const totalBalance = walletService.getBalance();

        res.json({totalBalance});
    } catch (err) {
        next(err);
    }
};


module.exports = {deposit, withdraw, balance};
