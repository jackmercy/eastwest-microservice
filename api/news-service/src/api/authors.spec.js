const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');
const middlewares = require('../middlewares');

describe('Authors API', () => {
  let app = null;
  let mockData = [
    {
      resumes: ['60d93b5a28c56d0011654bcf', '60d93b5a28c56d0011654bd0'],
      firstName: 'hai',
      lastName: 'bui',
      emailAddress: 'tester@eastwest.live',
      phoneNumber: '0123456789',
      knownFrom: 'web',
      news: '60d931aa4f555b001175a30e',
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
    createAuthor: () => Promise.resolve('author id'),
    getAuthors: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getAuthorById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    updateAuthor: (id, newData) => {
      const updatedData = mockData.find((item) => item.id === id);
      Promise.resolve({ ...updatedData, ...newData });
    },
    deleteAuthor: (id) =>
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
      Author: asValue(models.Author),
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

  it('can create a new author', (done) => {
    request(app)
      .post('/news-authors')
      .send({
        firstName: 'hai',
        lastName: 'bui',
        emailAddress: 'tester@eastwest.live',
        phoneNumber: '0123456789',
        knownFrom: 'web',
        news: '60d931aa4f555b001175a30e',
        address: 'Some where in the earth',
        linkedinProfile: '',
      })
      .attach('avatar', '')
      .attach('resumes', '')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can return all authors', (done) => {
    request(app)
      .get('/news-authors')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed news by id', (done) => {
    request(app)
      .get(`/news-authors/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can delete a author by id', (done) => {
    request(app)
      .delete(`/news-authors/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
