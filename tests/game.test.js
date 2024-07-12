const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const {MAX_BET, MIN_BET} = require('../config');
const {expect} = chai;

chai.use(chaiHttp);

describe('Game API', () => {
    //Testing /rtp API before played games
    it('should get RTP 0', (done) => {
        chai.request(app)
            .get('/rtp')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('rtp')
                    .that.equals(0);
                done();
            });
    });

    // Add a balance before running the next tests
    const INITIAL_AMOUNT = 1000;
    before((done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: INITIAL_AMOUNT})  // Add a sufficient amount for testing
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance').that.equals(1000);
                done();
            });
    });

    //Testing /play API
    it('should play a single game', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('matrix');
                expect(res.body).to.have.property('winnings');
                done();
            });
    });

    it('should throw bet is required error', (done) => {
        chai.request(app)
            .post('/play')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" is required');
                done();
            });
    });

    it('should throw bet amount positive number error', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: -10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" must be a positive number');
                done();
            });
    });

    it('should throw bet amount number error', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: "a"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" must be a number');
                done();
            });
    });

    it('should throw bet amount positive number error', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: 0})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" must be a positive number');
                done();
            });
    });

    it('should throw bet amount safe number error', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: Number.MAX_VALUE})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" must be a safe number');
                done();
            });
    });

    it('should throw bet amount max error', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: MAX_BET + 1})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals(`"bet" must be less than or equal to ${MAX_BET}`);
                done();
            });
    });

    it('should throw bet amount min error', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: MIN_BET - 1})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.satisfies((msg) => {
                    return msg === `"bet" must be greater than or equal to ${MIN_BET}`
                        || msg === '"bet" must be a positive number';
                });
                done();
            });
    });

    it('should throw bet amount integer number error', (done) => {
        chai.request(app)
            .post('/play')
            .send({bet: MAX_BET - MIN_BET + 0.1})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" must be an integer');
                done();
            });
    });

    //Testing /sim API
    it('should simulate multiple games', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: 10, bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalWinnings');
                expect(res.body).to.have.property('netResult');
                done();
            });
    });

    it('should throw bet is required error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" is required');
                done();
            });
    });

    it('should throw count is required error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"count" is required');
                done();
            });
    });

    it('should throw count positive number error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: -10, bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"count" must be a positive number');
                done();
            });
    });

    it('should throw count number error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: "a", bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"count" must be a number');
                done();
            });
    });

    it('should throw count positive number error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: 0, bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"count" must be a positive number');
                done();
            });
    });

    it('should throw count safe number error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: Number.MAX_VALUE, bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"count" must be a safe number');
                done();
            });
    });

    it('should throw insufficient balance error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: INITIAL_AMOUNT, bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Insufficient balance');
                done();
            });
    });

    it('should throw count integer number error', (done) => {
        chai.request(app)
            .post('/sim')
            .send({count: 1.5, bet: 10})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"count" must be an integer');
                done();
            });
    });

    //Testing /rtp API after played games
    it('should get RTP with max 2 decimal signs', (done) => {
        chai.request(app)
            .get('/rtp')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('rtp');
                const rtp = res.body.rtp.toString();
                const decimalSignIndexFromEnd = rtp.length - rtp.indexOf(".");
                expect(decimalSignIndexFromEnd).to.be.lessThanOrEqual(3);
                done();
            });
    });

});
