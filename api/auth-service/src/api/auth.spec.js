const request = require('supertest');
const jwt = require('jsonwebtoken');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');

describe('Auth API', () => {
  let app = null;
  const mockServerSettings = { port: 3000 };
  const mockJWTSettings = {
    secret: 'jwt secret',
    expiresIn: 24 * 60 * 60, // 24hrs
    expiresInRemembered: 30 * 24 * 60 * 60, // 30days
  };
  const mockRepo = {
    generateToken: () => Promise.resolve('token'),
    verifyToken: () => Promise.resolve(mockTokenData),
    verifyPermissions: () => Promise.resolve({ hasPermissions: true }),
  };

  const mockTokenData = {
    userId: 'someId',
    emailAddress: 'buithanhhai2207@gmail.com',
    roles: ['admin', 'user'],
  };
  const mockToken = jwt.sign(mockTokenData, mockJWTSettings.secret, {
    expiresIn: mockJWTSettings.expiresIn,
  });

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      validate: asValue(models.validate),
      jwtSettings: asValue(mockJWTSettings),
      serverSettings: asValue(mockServerSettings),
    });

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can generate token', (done) => {
    request(app)
      .post('/auth/generate-token')
      .send({
        userId: 'user id',
        emailAddress: 'tester@eastwest.live',
        roles: ['user', 'admin'],
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('can verify token', (done) => {
    request(app)
      .post('/auth/verify-token')
      .send({ token: mockToken })
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockTokenData);
        done();
      });
  });

  it('can verify permissions', (done) => {
    request(app)
      .post('/auth/verify-permissions')
      .send({
        roles: ['admin'],
        oneOfPermissions: false,
        permissions: [{ resource: 'user', action: 'create', scope: 'any' }],
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
