const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { expect } = chai;

chai.use(chaiHttp);

describe('Game API', () => {
    // Add a balance before running the tests
    before((done) => {
        chai.request(app)
            .post('/wallet/deposit')
            .send({ amount: 1000 })  // Add a sufficient amount for testing
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalBalance').that.equals(1000);
                done();
            });
    });

    it('should play a single game', (done) => {
        chai.request(app)
            .post('/play')
            .send({ bet: 10 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('matrix');
                expect(res.body).to.have.property('winnings');
                done();
            });
    });

    it('should throw bet amount error', (done) => {
        chai.request(app)
            .post('/play')
            .send({ bet: -10 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error')
                    .that.equals('Bad Request');
                expect(res.body).to.have.property('message')
                    .that.equals('"bet" must be a positive number');
                done();
            });
    });

    it('should simulate multiple games', (done) => {
        chai.request(app)
            .post('/sim')
            .send({ count: 10, bet: 10 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('totalWinnings');
                expect(res.body).to.have.property('netResult');
                done();
            });
    });

    it('should get RTP', (done) => {
        chai.request(app)
            .get('/rtp')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('rtp');
                done();
            });
    });
});
