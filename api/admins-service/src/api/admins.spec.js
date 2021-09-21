const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');

describe('Admins API', () => {
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
      createdAt: 1612504963849,
      updatedAt: 1612504963849,
      id: '601cdf831203a4001178c4a0',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createAdmin: () => Promise.resolve('admin id'),
    getAllAdmins: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getAdminById: (token, id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    deleteAdmin: (token, id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
    login: () => Promise.resolve({ token: 'token' }),
  };
  const mockServices = {
    rolesService: {
      getRoles: () => Promise.resolve(),
      getRoleByAlias: () => Promise.resolve(),
    },
    usersService: {
      createUser: () => Promise.resolve(),
      getAllUsersByRoleId: () => Promise.resolve(),
      getUserByEmail: () => Promise.resolve(mockData[0]),
      getUserById: () => Promise.resolve(),
      deleteUserById: () => Promise.resolve(),
      login: () => Promise.resolve({ token: 'abc' }),
    },
    authService: {
      verifyToken: () => Promise.resolve({ roles: ['admin', 'user'] }),
    },
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      serverSettings: asValue(mockServerSettings),
      rolesService: asValue(mockServices.rolesService),
      usersService: asValue(mockServices.usersService),
      authService: asValue(mockServices.authService),
    });

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can create a new admin', (done) => {
    request(app)
      .post('/admins')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
      })
      .expect(201, done);
  });

  it('can return all admins', (done) => {
    request(app)
      .get('/admins')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed admin by id', (done) => {
    request(app)
      .get(`/admins/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can delete a admin by id', (done) => {
    request(app)
      .delete(`/admins/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });

  it('can login with existed account', (done) => {
    request(app)
      .post('/admins/login')
      .set('Accept', 'application/json')
      .send({
        emailAddress: mockData[0].emailAddress,
        password: '123456',
      })
      .expect(200, done);
  });
});
