const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const {resetDB} = require('../services');
const {expect} = chai;

chai.use(chaiHttp);

//Testing wallet API before transfers
describe('Wallet API before transfers', () => {
    it('should get initial balance of 0', (done) => {
        chai.request(app)
            .get('/wallet/balance')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance')
                    .that.equals(0);
                done();
            });
    });

    it('should throw withdraw amount insufficient error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: 1})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Insufficient balance');
                done();
            });
    });
});

//Testing wallet API
describe('Wallet API', () => {
    let testTotalBalance = 0;

    //Testing /wallet/deposit API
    it('should deposit money', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: 100})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance')
                    .that.equals(100);

                testTotalBalance += 100;
                done();
            });
    });

    it('should throw deposit amount is required error', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" is required');
                done();
            });
    });

    it('should throw deposit amount positive number error', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: -100})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a positive number');
                done();
            });
    });

    it('should throw deposit amount number error', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: "10"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a number');
                done();
            });
    });

    it('should throw deposit amount positive number error', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: 0})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a positive number');
                done();
            });
    });

    it('should throw deposit amount safe number error', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: Number.MAX_VALUE})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a safe number');
                done();
            });
    });

    it('should throw deposit amount integer number error', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: 1.5})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be an integer');
                done();
            });
    });

    //Testing /wallet/withdraw API
    it('should withdraw money', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: 50})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance');

                testTotalBalance -= 50;
                done();
            });
    });

    it('should throw withdraw amount is required error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" is required');
                done();
            });
    });

    it('should throw withdraw amount positive number error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: -100})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a positive number');
                done();
            });
    });

    it('should throw withdraw amount number error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: "10"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a number');
                done();
            });
    });

    it('should throw withdraw amount positive number error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: 0})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a positive number');
                done();
            });
    });

    it('should throw withdraw amount safe number error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: Number.MAX_VALUE})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a safe number');
                done();
            });
    });

    it('should throw withdraw amount integer number error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: 1.5})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be an integer');
                done();
            });
    });

    it('should throw withdraw amount insufficient error', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: testTotalBalance + 1})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Insufficient balance');
                done();
            });
    });

    //Testing /wallet/balance API values after deposit/withdraws
    it('should get correct balance', (done) => {
        chai.request(app)
            .get('/wallet/balance')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance')
                    .that.equals(testTotalBalance);
                done();
            });
    });

    //Reset DB/local variables to initial state
    after((done) => {
        resetDB();
        done();
    });
});
