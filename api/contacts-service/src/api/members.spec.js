const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');

describe('Members API', () => {
  let app = null;
  let mockData = [
    {
      id: '6016325565dce20011a1b833',
      firstName: 'Hai',
      lastName: 'Bui',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      socialId: 'abdddc23',
      roles: [],
      emailAddress: 'test@gmail.com',
      createdAt: 1612067413560,
      updatedAt: 1612067413560,
    },
  ];
  let mockActivityData = [
    {
      action: 'update',
      description: 'like acticle',
      resource: 'news',
      resourceId: 'abc',
      member: '61230d0b246d920018bbd2e1',
      createdAt: '2021-08-26T03:49:40.521Z',
      updatedAt: '2021-08-26T03:49:40.521Z',
      id: '61270f544283850011553c31',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    loginAsCommunityMember: () => Promise.resolve('member id'),
    createMember: () => Promise.resolve('member id'),
    getMembers: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getMemberById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    updateMember: (id, newData) => {
      const updatedData = mockData.find((item) => item.id === id);
      Promise.resolve({ ...updatedData, ...newData });
    },
    deleteMember: (id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
    createMemberActivity: () => Promise.resolve('member activity id'),
    getMemberActivities: () =>
      Promise.resolve({
        data: mockActivityData,
        count: mockActivityData.length,
      }),
    getMemberActivityById: (memberId, id) =>
      Promise.resolve(mockActivityData.find((item) => item.id === id)),
    deleteMemberActivity: (memberId, id) =>
      Promise.resolve(
        mockData.slice(mockActivityData.findIndex((item) => item.id === id)),
        1,
      ),
  };
  const mockServices = {
    notificationsService: {
      createNewMemberEmail: () => Promise.resolve(),
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
      validate: asValue(models.validate),
      Member: asValue(models.Member),
      Activity: asValue(models.Activity),
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

  it('can create a new member', (done) => {
    request(app)
      .post('/community-members')
      .send({
        firstName: 'Hai',
        lastName: 'Bui',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        socialId: 'abdddc23',
        token: 'sodsajdlksajdjlas',
      })
      .set('Accept', 'application/json')
      .expect(201, done);
  });

  it('can return all members', (done) => {
    request(app)
      .get('/community-members')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed member by id', (done) => {
    request(app)
      .get(`/community-members/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can delete a member by id', (done) => {
    request(app)
      .delete(`/community-members/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });

  it('can delete a member by id', (done) => {
    request(app)
      .put(`/community-members/${mockData[0].id}`)
      .send({ ...mockData[0], status: 'banned' })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(200, done);
  });

  it('can login with member account', (done) => {
    request(app)
      .post('/community-members/login')
      .set('Accept', 'application/json')
      .send({
        emailAddress: mockData[0].emailAddress,
        socialId: mockData[0].socialId,
      })
      .expect(200, done);
  });

  it('can create a new member activity', (done) => {
    request(app)
      .post(`/community-members/${mockData[0].id}/activities`)
      .send({
        action: 'update',
        description: 'like acticle',
        resource: 'news',
        resourceId: 'abc',
      })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can return all member activities', (done) => {
    request(app)
      .get(`/community-members/${mockData[0].id}/activities`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed member activity by id', (done) => {
    request(app)
      .get(
        `/community-members/${mockData[0].id}/activities/${mockActivityData[0].id}`,
      )
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockActivityData[0]);
        done();
      });
  });

  it('can delete a member activity by id', (done) => {
    request(app)
      .delete(
        `/community-members/${mockData[0].id}/activities/${mockActivityData[0].id}`,
      )
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });

  it('can login with member account', (done) => {
    request(app)
      .post('/community-members/login')
      .set('Accept', 'application/json')
      .send({
        emailAddress: mockData[0].emailAddress,
        socialId: mockData[0].socialId,
      })
      .expect(200, done);
  });
});
