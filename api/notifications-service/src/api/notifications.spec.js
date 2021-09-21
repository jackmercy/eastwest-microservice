const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');

describe('Notifications API', () => {
  let app = null;
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    createNewProspectEmail: (payload) => Promise.resolve(payload),
    createNewContactEmail: (payload) => Promise.resolve(payload),
    createNewVacancyApplicationEmail: (payload) => Promise.resolve(payload),
    resendVacancyApplicationEmail: (payload) => Promise.resolve(payload),
  };
  const mockServices = {
    mailService: {
      sendMail: (payload) => Promise.resolve(payload),
    },
    smsService: {},
    webpushService: {},
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      serverSettings: asValue(mockServerSettings),
      validate: asValue(models.validate),
      smsService: asValue(mockServices.smsService),
      mailService: asValue(mockServices.mailService),
      webpushService: asValue(mockServices.webpushService),
    });

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can create new email template for new prospect request', (done) => {
    request(app)
      .post('/notifications/prospect/new-request')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
        companyName: 'Eastwest',
        title: 'Software engineer',
        description: 'I want create a survey platform',
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('can create new email template for new contact request', (done) => {
    request(app)
      .post('/notifications/contact/new-request')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
        phoneNumber: '0123456789',
        reason: 'I want to do something',
        description: 'I want create a survey platform',
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('can create new email template for new vacancy application', (done) => {
    request(app)
      .post('/notifications/vacancies/new-application')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
        phoneNumber: '0123456789',
        knownFrom: 'google',
        linkedinProfile: undefined,
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('can resend email template for vacancy application when existed', (done) => {
    request(app)
      .post('/notifications/vacancies/resend-application')
      .send({
        firstName: 'tester',
        lastName: 'name',
        emailAddress: 'tester@eastwest.live',
        phoneNumber: '0123456789',
        knownFrom: 'google',
        linkedinProfile: undefined,
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
