const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');
const middlewares = require('../middlewares');

describe('Roles API', () => {
  let app = null;
  let mockData = [
    {
      alias: 'admin',
      name: 'Admin',
      priority: 1,
      createdAt: 1612416835924,
      updatedAt: 1612416835924,
      id: '601b87430ac9c83d0019b929',
      permissions: ['601b87750ac9c83d0019b930'],
    },
    {
      alias: 'superadmin',
      name: 'SuperAdmin',
      priority: 0,
      createdAt: 1612416849442,
      updatedAt: 1612416849442,
      id: '601b87510ac9c83d0019b92b',
      permissions: ['601b87750ac9c83d0019b930'],
    },
  ];
  const mockPermissionsData = [
    {
      roleId: '601b87430ac9c83d0019b929',
      resource: 'prospect',
      action: 'delete',
      scope: 'any',
      shortDes: 'admin-delete-any-prospect-*',
      createdAt: 1612416885852,
      updatedAt: 1612416885852,
      id: '601b87750ac9c83d0019b930',
    },
  ];
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createRole: () => Promise.resolve('role id'),
    getAllRoles: () =>
      Promise.resolve({ data: mockData, count: mockData.length }),
    getRoleById: (id) =>
      Promise.resolve(mockData.find((item) => item.id === id)),
    getRoleByAlias: (alias) =>
      Promise.resolve(mockData.find((item) => item.alias === alias)),
    deleteRole: (id) =>
      Promise.resolve(
        mockData.slice(mockData.findIndex((item) => item.id === id)),
        1,
      ),
    createPermission: () => Promise.resolve('permission id'),
    getAllPermissionsByRoleId: ({ roleId }) => {
      const permissions = mockPermissionsData.filter(
        (item) => item.roleId === roleId,
      );
      return Promise.resolve({ data: permissions, count: permissions.length });
    },
    getPermissionById: (roleId, id) =>
      Promise.resolve(
        mockPermissionsData.find(
          (item) => item.roleId === roleId && item.id === id,
        ),
      ),
    deletePermission: (roleId, id) => Promise.resolve(),
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
      User: asValue(models.Role),
      Role: asValue(models.Role),
      Permission: asValue(models.Permission),
      serverSettings: asValue(mockServerSettings),
      authService: asValue(mockServices.authService),
    });

    sinon
      .stub(middlewares, 'hasValidRolePriority')
      .callsFake((req, res, next) => next());

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    middlewares.hasValidRolePriority.restore();
    app.close();
    app = null;
  });

  it('can create a new role', (done) => {
    request(app)
      .post('/roles')
      .send({ alias: 'test', name: 'Test' })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can return all roles', (done) => {
    request(app)
      .get('/roles')
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData.length);
        done();
      });
  });

  it('can return existed role by id', (done) => {
    request(app)
      .get(`/roles/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body).to.eql(mockData[0]);
        done();
      });
  });

  it('can get a role by alias', (done) => {
    request(app)
      .get(`/roles/alias/admin`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai
          .expect(res.body)
          .to.eql(mockData.find((item) => item.alias === 'admin'));
        done();
      });
  });

  it('can delete a role by id', (done) => {
    request(app)
      .delete(`/roles/${mockData[0].id}`)
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });

  it('can create a new permission', (done) => {
    request(app)
      .post(`/roles/${mockData[0].id}/permissions`)
      .send({ alias: 'test', name: 'Test' })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer some-token')
      .expect(201, done);
  });

  it('can get all permissions by role id', (done) => {
    request(app)
      .get(`/roles/${mockData[0].id}/permissions`)
      .set('Authorization', 'Bearer some-token')
      .expect(200)
      .end((error, res) => {
        chai.expect(res.body.count).to.equal(mockData[0].permissions.length);
        done();
      });
  });

  it('can get permission by id', (done) => {
    request(app)
      .get(
        `/roles/${mockData[0].id}/permissions/${mockData[0].permissions[0].id}`,
      )
      .set('Authorization', 'Bearer some-token')
      .expect(200, done);
  });

  it('can delete permission', (done) => {
    request(app)
      .delete(
        `/roles/${mockData[0].id}/permissions/${mockData[0].permissions[0].id}`,
      )
      .set('Authorization', 'Bearer some-token')
      .expect(204, done);
  });
});
