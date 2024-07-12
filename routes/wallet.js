const express = require('express');
const {walletController} = require('../controllers');
const {validator, amountSchema} = require('../middlewares');
const router = express.Router();


/**
 * @swagger
 * /wallet/deposit:
 *   post:
 *     summary: Deposit funds to the wallet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Deposit result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 */
router.post('/wallet/deposit', validator(amountSchema), walletController.deposit);

/**
 * @swagger
 * /wallet/withdraw:
 *   post:
 *     summary: Withdraw funds from the wallet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Withdrawal result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 */
router.post('/wallet/withdraw', validator(amountSchema), walletController.withdraw);

/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     responses:
 *       200:
 *         description: Wallet balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 */
router.get('/wallet/balance', walletController.balance);


module.exports = router;