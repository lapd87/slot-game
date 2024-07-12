const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const {expect} = chai;

chai.use(chaiHttp);

describe('Wallet API', () => {
    it('should deposit money', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: 100})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance');
                done();
            });
    });

    it('should throw deposit money positive number error', (done) => {
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

    it('should throw deposit money error', (done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({amount: "a"})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"amount" must be a number');
                done();
            });
    });

    it('should withdraw money', (done) => {
        chai.request(app)
            .post('/wallet/withdraw')
            .send({amount: 50})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance');
                done();
            });
    });

    it('should get balance', (done) => {
        chai.request(app)
            .get('/wallet/balance')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance');
                done();
            });
    });
});