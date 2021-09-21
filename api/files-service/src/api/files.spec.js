const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');

describe('Files API', () => {
  let app = null;
  let mockData = [
    {
      size: 2021,
      path: '/.tmp/uploads/testing/avatarssdasd-1624857502618.md',
      name: 'avatarssdasd-1624857502618.md',
      mimetype: 'text/markdown',
      uploadName: 'release.md',
      public: true,
      id: '60d95b9ebeba160011eae570',
      fieldName: 'avatarssdasd',
    },
    {
      size: 1596,
      path: '/.tmp/uploads/testing/tada-1624857502620.txt',
      name: 'tada-1624857502620.txt',
      mimetype: 'text/plain',
      uploadName: 'interview-stack.txt',
      public: false,
      id: '60d95b9ebeba160011eae571',
      fieldName: 'tada',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    uploadFiles: () => Promise.resolve({ data: [mockData[1]], count: 1 }),
    downloadFile: (id, queries = { public: false }) =>
      Promise.resolve(
        mockData.find(
          (item) => item.id === id && item.public === queries.public,
        ),
      ),
    deleteFile: (id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
  };
  const mockServices = {
    authService: {
      verifyToken: () => Promise.resolve({ roles: ['admin', 'user'] }),
      verifyPermissions: () => Promise.resolve({ hasPermissions: true }),
    },
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      File: asValue(models.File),
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

  // it('can upload multiple files', (done) => {
  //   request(app)
  //     .post('/files')
  //     .attach('file1', 'abc.txt')
  //     .set('Accept', 'application/json')
  //     .expect(201)
  //     .end((error, res) => {
  //       chai.expect(res.body.count).to.eql(1);
  //       done();
  //     });
  // });

  // it('can upload multiple public files without Authentication header', (done) => {
  //   request(app)
  //     .post('/files/public')
  //     .attach('file1', '')
  //     .attach('file2', '')
  //     .attach('file3', '')
  //     .expect(201)
  //     .end((error, res) => {
  //       chai.expect(res.body.count).to.eql(3);
  //       done();
  //     });
  // });

  // it('can download a file by id', (done) => {
  //   request(app)
  //     .get(`/files/${mockData[0].id}`)
  //     .set('Authorization', 'Bearer some-token')
  //     .expect(200, done);
  // });

  // it('can download a file by id', (done) => {
  //   request(app)
  //     .get(`/files/public/${mockData[0].id}`)
  //     .set('Authorization', 'Bearer some-token')
  //     .expect(200, done);
  // });

  // it('can download a public file by id without Authentication header', (done) => {
  //   request(app).get(`/files/public/${mockData[0].id}`).expect(200, done);
  // });

  it('can not download a private file with public route', (done) => {
    request(app).get(`/files/public/${mockData[1].id}`).expect(404, done);
  });

  it('can delete a file by id', (done) => {
    request(app)
      .delete(`/files/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
