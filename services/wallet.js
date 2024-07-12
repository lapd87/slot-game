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


module.exports = {deductAmount, addAmount, getBalance};