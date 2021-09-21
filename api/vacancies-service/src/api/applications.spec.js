const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');
const middlewares = require('../middlewares');

describe('Applications API', () => {
  let app = null;
  let mockData = [
    {
      resumes: ['60d93b5a28c56d0011654bcf', '60d93b5a28c56d0011654bd0'],
      firstName: 'hai',
      lastName: 'bui',
      emailAddress: 'tester@eastwest.live',
      phoneNumber: '0123456789',
      knownFrom: 'web',
      vacancy: '60d931aa4f555b001175a30e',
      address: 'Some where in the earth',
      linkedinProfile: '',
      avatar: '60d93b5a28c56d0011654bce',
      createdAt: '2021-06-28T03:00:42.530Z',
      updatedAt: '2021-06-28T03:00:42.530Z',
      id: '60d93b5a4f555b001175a310',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createApplication: () => Promise.resolve('application id'),
    getApplications: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getApplicationById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    updateApplication: (id, newData) => {
      const updatedData = mockData.find((item) => item.id === id);
      Promise.resolve({ ...updatedData, ...newData });
    },
    deleteApplication: (id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
    login: () => Promise.resolve('token'),
  };
  const mockServices = {
    authService: {
      verifyToken: () => Promise.resolve({ roles: ['admin'] }),
      verifyPermissions: () => Promise.resolve({ hasPermissions: true }),
    },
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      Application: asValue(models.Application),
      validate: asValue(models.validate),
      serverSettings: asValue(mockServerSettings),
      authService: asValue(mockServices.authService),
      notificationsService: asValue(mockServices.notificationsService),
    });

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can create a new application without Authentication header', (done) => {
    request(app)
      .post('/vacancy-applications')
      .send({
        firstName: 'hai',
        lastName: 'bui',
        emailAddress: 'tester@eastwest.live',
        phoneNumber: '0123456789',
        knownFrom: 'web',
        vacancy: '60d931aa4f555b001175a30e',
        address: 'Some where in the earth',
        linkedinProfile: '',
      })
      .attach('avatar', '')
      .attach('resumes', '')
      .expect(201, done);
  });

  it('can return all applications', (done) => {
    request(app)
      .get('/vacancy-applications')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed vacancy by id', (done) => {
    request(app)
      .get(`/vacancy-applications/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can delete a application by id', (done) => {
    request(app)
      .delete(`/vacancy-applications/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
