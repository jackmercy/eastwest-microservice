const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');

describe('Prospects API', () => {
  let app = null;
  let mockData = [
    {
      id: '6016325565dce20011a1b833',
      firstName: 'tester',
      lastName: 'name',
      emailAddress: 'tester@eastwest.live',
      phoneNumber: '0123456789',
      companyName: 'Eastwest',
      title: 'Software engineer',
      country: 'Viet nam',
      description: 'I want create a survey platform',
      createdAt: 1612067413560,
      updatedAt: 1612067413560,
    },
    {
      id: '60177a8d2a508e00125ac85f',
      firstName: 'tester',
      lastName: 'name',
      emailAddress: 'tester@eastwest.live',
      phoneNumber: '0123456789',
      companyName: 'Eastwest',
      title: 'Software engineer',
      country: 'Viet nam',
      description: 'I want create a survey platform',
      createdAt: 1612151437496,
      updatedAt: 1612151437496,
    },
    {
      id: '60177abc2a508e00125ac860',
      firstName: 'tester',
      lastName: 'name',
      emailAddress: 'tester@eastwest.live',
      phoneNumber: '0123456789',
      companyName: 'Eastwest',
      title: 'Software engineer',
      country: 'Viet nam',
      description: 'I want create a survey platform',
      createdAt: 1612151484619,
      updatedAt: 1612151484619,
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createProspect: () => Promise.resolve('prospect id'),
    getProspects: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getProspectById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    deleteProspect: (id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
  };
  const mockServices = {
    notificationsService: {
      createNewProspectEmail: () => Promise.resolve(),
    },
    authService: {
      verifyToken: () => Promise.resolve({ roles: ['admin', 'user'] }),
      verifyPermissions: () => Promise.resolve({ hasPermissions: true }),
    },
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      Prospect: asValue(models.Prospect),
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

  it('can create a new prospect', (done) => {
    request(app)
      .post('/prospects')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
        phoneNumber: '0123456789',
        companyName: 'Eastwest',
        title: 'Software engineer',
        country: 'Viet nam',
        description: 'I want create a survey platform',
      })
      .set('Accept', 'application/json')
      .expect(201, done);
  });

  it('can return all prospects', (done) => {
    request(app)
      .get('/prospects')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed prospect by id', (done) => {
    request(app)
      .get(`/prospects/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can delete a prospect by id', (done) => {
    request(app)
      .delete(`/prospects/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
