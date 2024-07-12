const express = require('express');
const {gameController} = require('../controllers');
const {validator, playSchema, simSchema} = require('../middlewares');
const gameRouter = express.Router();


/**
 * @swagger
 * /play:
 *   post:
 *     summary: Execute a single random spin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bet:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Spin result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matrix:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: string
 *                 winnings:
 *                   type: number
 */
gameRouter.post('/play', validator(playSchema), gameController.play);

/**
 * @swagger
 * /sim:
 *   post:
 *     summary: Simulate multiple spins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: number
 *                 example: 10
 *               bet:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Simulation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalWinnings:
 *                   type: number
 *                 netResult:
 *                   type: number
 */
gameRouter.post('/sim', validator(simSchema), gameController.sim);

/**
 * @swagger
 * /rtp:
 *   get:
 *     summary: Get RTP percentage
 *     responses:
 *       200:
 *         description: RTP percentage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rtp:
 *                   type: number
 */
gameRouter.get('/rtp', gameController.rtp);


module.exports = gameRouter;