let balance = 0;

const deductAmount = (amount) => {
    balance -= amount;
    return balance;
};

const addAmount = (amount) => {
    balance += amount;
    return balance;
};

const getBalance = () => {
    return balance;
};

const resetWalletDB = () => {
    if (process.env.NODE_ENV !== "test") return;

    balance = 0;
}


module.exports = {deductAmount, addAmount, getBalance, resetWalletDB};