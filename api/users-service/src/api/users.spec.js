const request = require('supertest');
const bcrypt = require('bcrypt');
const chai = require('chai');
const sinon = require('sinon');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');
const middlewares = require('../middlewares');

describe('Users API', () => {
  let app = null;
  let mockData = [
    {
      roles: [
        {
          alias: 'admin',
          name: 'Admin',
          priority: 1,
          id: '602cb3022de135308c3a107d',
        },
        {
          alias: 'user',
          name: 'User',
          priority: 10,
          id: '602cb3022de135308c3a107f',
        },
      ],
      firstName: 'tester',
      lastName: 'name',
      emailAddress: 'stony2207@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      createdAt: 1612504963849,
      updatedAt: 1612504963849,
      id: '601cdf831203a4001178c4a0',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createUser: () => Promise.resolve('user id'),
    getUsers: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getAllUsersByRoleId: ({ roleId }) => {
      const data = mockData.filter((item) => item.roles.includes(roleId));
      return Promise.resolve({ data, count: data.length });
    },
    getUserByEmail: (emailAddress) =>
      Promise.resolve(
        mockData.find((item) => item.emailAddress === emailAddress),
      ),
    getUserById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    deleteUser: (id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
    login: () => Promise.resolve('token'),
  };
  const mockServices = {
    rolesService: {
      getRoleByAlias: () => Promise.resolve(),
    },
    authService: {
      generateToken: () => Promise.resolve('token'),
      verifyToken: () => Promise.resolve({ roles: ['admin', 'user'] }),
      verifyPermissions: () => Promise.resolve({ hasPermissions: true }),
    },
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      User: asValue(models.User),
      validate: asValue(models.validate),
      serverSettings: asValue(mockServerSettings),
      rolesService: asValue(mockServices.rolesService),
      authService: asValue(mockServices.authService),
    });

    sinon
      .stub(middlewares, 'hasValidRolePriority')
      .callsFake((req, res, next) => next());

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    middlewares.hasValidRolePriority.restore();
    app.close();
    app = null;
  });

  it('should return unauthorize if header empty', (done) => {
    request(app)
      .post('/users')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
      })
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('can create a new user', (done) => {
    request(app)
      .post('/users')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can return all users', (done) => {
    request(app)
      .get('/users')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return all users by role id', (done) => {
    const roleId = mockData[0].roles[0].id;
    request(app)
      .get(`/users/role/${roleId}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai
          .expect(res.body.count)
          .to.equal(
            mockData.filter((item) => item.roles.includes(roleId)).length,
          );
        done();
      });
  });

  it('can return existed user by email address', (done) => {
    request(app)
      .get(`/users/email/${mockData[0].emailAddress}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can return existed user by id', (done) => {
    request(app)
      .get(`/users/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can delete a user by id', (done) => {
    request(app)
      .delete(`/users/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });

  it('can login with existed account', (done) => {
    request(app)
      .post('/users/login')
      .send({
        emailAddress: mockData[0].emailAddress,
        password: '123456',
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
