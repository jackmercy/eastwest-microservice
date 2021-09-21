const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');
const middlewares = require('../middlewares');

describe('Vacancies API', () => {
  let app = null;
  let mockData = [
    {
      type: 'full-time',
      status: 'public',
      language: 'en',
      seoKeywords: ['vacancy', 'e2w', 'eastwest'],
      title: 'Test new Vacancy',
      subTitle: 'Engineering - Ho Chi Minh',
      htmlContent: '<div>test new vacancy</div>',
      slug: 'new-vacancy',
      department: null,
      seoTitle: 'Test new Vacancy',
      seoDescription: 'Test new Vacancy',
      createdAt: '2021-04-09T07:40:07.144Z',
      updatedAt: '2021-04-09T07:40:07.144Z',
      id: '607004d711e55b00123c206d',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createVacancy: () => Promise.resolve('vacancy id'),
    getVacancies: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getVacancyBySlug: (slug) =>
      Promise.resolve(mockData.find((item) => item.slug === slug)),
    getVacancyById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    updateVacancy: (id, newData) => {
      const updatedData = mockData.find((item) => item.id === id);
      Promise.resolve({ ...updatedData, ...newData });
    },
    deleteVacancy: (id) =>
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
      Vacancy: asValue(models.Vacancy),
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
      .post('/vacancies')
      .send({
        type: 'full-time',
        status: 'public',
        language: 'en',
        seoKeywords: ['vacancy', 'e2w', 'eastwest'],
        title: 'Test create a new Vacancy',
        subTitle: 'Engineering - Ho Chi Minh',
        htmlContent: '<div>test create a new vacancy</div>',
        slug: 'new-vacancy',
        department: null,
        seoTitle: 'Test new Vacancy',
        seoDescription: 'Test new Vacancy',
      })
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('can create a new vacancy', (done) => {
    request(app)
      .post('/vacancies')
      .send({
        type: 'full-time',
        status: 'public',
        language: 'en',
        seoKeywords: ['vacancy', 'e2w', 'eastwest'],
        title: 'Test create a new Vacancy',
        subTitle: 'Engineering - Ho Chi Minh',
        htmlContent: '<div>test create a new vacancy</div>',
        slug: 'new-vacancy',
        department: null,
        seoTitle: 'Test new Vacancy',
        seoDescription: 'Test new Vacancy',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can return all vacancies without Authorization header', (done) => {
    request(app)
      .get('/vacancies')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed vacancy by slug without Authorization header', (done) => {
    request(app)
      .get(`/vacancies/slug/${mockData[0].slug}`)
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can return existed vacancy by id without Authorization header', (done) => {
    request(app)
      .get(`/vacancies/${mockData[0].id}`)
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can update a vacancy', (done) => {
    request(app)
      .put(`/vacancies/${mockData[0].id}`)
      .send({
        ...mockData[0],
        title: 'Updated vacancy',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(200, done);
  });

  it('can delete a vacancy by id', (done) => {
    request(app)
      .delete(`/vacancies/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
