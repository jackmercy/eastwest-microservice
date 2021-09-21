const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');
const middlewares = require('../middlewares');

describe('Categories API', () => {
  let app = null;
  let mockData = [
    {
      language: 'en',
      name: 'Finance',
      createdAt: '2021-04-09T07:21:09.265Z',
      updatedAt: '2021-04-09T07:21:09.265Z',
      id: '60700065bf30a900117b1da3',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createCategory: () => Promise.resolve('category id'),
    getCategories: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getCategoryById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    updateCategory: (id, newData) => {
      const updatedData = mockData.find((item) => item.id === id);
      Promise.resolve({ ...updatedData, ...newData });
    },
    deleteCategory: (id) =>
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
      Category: asValue(models.Category),
      validate: asValue(models.validate),
      serverSettings: asValue(mockServerSettings),
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

  it('should return unauthorize if header empty', (done) => {
    request(app)
      .post('/vacancy-categories')
      .send({
        name: 'New category',
      })
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('can create a new category', (done) => {
    request(app)
      .post('/vacancy-categories')
      .send({
        name: 'New category',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can return all categories', (done) => {
    request(app)
      .get('/vacancy-categories')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed category by id', (done) => {
    request(app)
      .get(`/vacancy-categories/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can update a category', (done) => {
    request(app)
      .put(`/vacancy-categories/${mockData[0].id}`)
      .send({
        ...mockData[0],
        name: 'Updated category',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(200, done);
  });

  it('can delete a category by id', (done) => {
    request(app)
      .delete(`/vacancy-categories/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
