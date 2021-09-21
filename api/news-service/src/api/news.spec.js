const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');
const middlewares = require('../middlewares');

describe('News API', () => {
  let app = null;
  let mockData = [
    {
      type: 'full-time',
      status: 'public',
      language: 'en',
      seoKeywords: ['news', 'e2w', 'eastwest'],
      title: 'Test new News',
      subTitle: 'Engineering - Ho Chi Minh',
      htmlContent: '<div>test new news</div>',
      slug: 'new-news',
      department: null,
      seoTitle: 'Test new News',
      seoDescription: 'Test new News',
      createdAt: '2021-04-09T07:40:07.144Z',
      updatedAt: '2021-04-09T07:40:07.144Z',
      id: '607004d711e55b00123c206d',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createNews: () => Promise.resolve('news id'),
    getNews: () => Promise.resolve({ data: mockData, count: mockData.length }),
    getNewsBySlug: (slug) =>
      Promise.resolve(mockData.find((item) => item.slug === slug)),
    getNewsById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    updateNews: (id, newData) => {
      const updatedData = mockData.find((item) => item.id === id);
      Promise.resolve({ ...updatedData, ...newData });
    },
    updatePublicNews: (id, newData) => {
      const updatedData = mockData.find((item) => item.id === id);
      Promise.resolve({ ...updatedData, ...newData });
    },
    deleteNews: (id) =>
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
      News: asValue(models.News),
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
      .post('/news')
      .send({
        type: 'full-time',
        status: 'public',
        language: 'en',
        seoKeywords: ['news', 'e2w', 'eastwest'],
        title: 'Test create a new News',
        subTitle: 'Engineering - Ho Chi Minh',
        htmlContent: '<div>test create a new news</div>',
        slug: 'new-news',
        department: null,
        seoTitle: 'Test new News',
        seoDescription: 'Test new News',
      })
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('can create a new news', (done) => {
    request(app)
      .post('/news')
      .send({
        type: 'full-time',
        status: 'public',
        language: 'en',
        seoKeywords: ['news', 'e2w', 'eastwest'],
        title: 'Test create a new News',
        subTitle: 'Engineering - Ho Chi Minh',
        htmlContent: '<div>test create a new news</div>',
        slug: 'new-news',
        department: null,
        seoTitle: 'Test new News',
        seoDescription: 'Test new News',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can return all news without Authorization header', (done) => {
    request(app)
      .get('/news')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed news by slug without Authorization header', (done) => {
    request(app)
      .get(`/news/slug/${mockData[0].slug}`)
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can return existed news by id without Authorization header', (done) => {
    request(app)
      .get(`/news/${mockData[0].id}`)
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can update a news', (done) => {
    request(app)
      .put(`/news/${mockData[0].id}`)
      .send({ ...mockData[0], title: 'Updated news' })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(200, done);
  });

  it('can update a news with public api and without Authentication header', (done) => {
    request(app)
      .put(`/news/public/${mockData[0].id}`)
      .send({ ...mockData[0], views: 10 })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('can delete a news by id', (done) => {
    request(app)
      .delete(`/news/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
