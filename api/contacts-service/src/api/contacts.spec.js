const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');

describe('Contacts API', () => {
  let app = null;
  let mockData = [
    {
      id: '6016325565dce20011a1b833',
      firstName: 'tester',
      lastName: 'name',
      emailAddress: 'tester@eastwest.live',
      phoneNumber: '0123456789',
      reason: 'I want to do something',
      country: 'Vietnam',
      city: 'Ho chi minh',
      address: 'somewhere in the earth',
      description: 'Tada',
      createdAt: 1612067413560,
      updatedAt: 1612067413560,
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createContact: () => Promise.resolve('contact id'),
    getContacts: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getContactById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    deleteContact: (id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
  };
  const mockServices = {
    notificationsService: {
      createNewContactEmail: () => Promise.resolve(),
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
      Contact: asValue(models.Contact),
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

  it('can create a new contact', (done) => {
    request(app)
      .post('/contacts')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
        phoneNumber: '0123456789',
        reason: 'I want to do something',
        country: 'Vietnam',
        city: 'Ho chi minh',
        address: 'somewhere in the earth',
        description: 'Tada',
      })
      .set('Accept', 'application/json')
      .expect(201, done);
  });

  it('can return all contacts', (done) => {
    request(app)
      .get('/contacts')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed contact by id', (done) => {
    request(app)
      .get(`/contacts/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can delete a contact by id', (done) => {
    request(app)
      .delete(`/contacts/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
