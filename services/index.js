const gameService = require('./game');
const walletService = require('./wallet');

const resetDB = () => {
    gameService.resetGameDB();
    walletService.resetWalletDB();
}


module.exports = {gameService, walletService, resetDB};
