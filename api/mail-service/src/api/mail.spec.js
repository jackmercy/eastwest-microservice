const request = require('supertest');
const chai = require('chai');
const { createContainer, asValue } = require('awilix');
const server = require('../server/server');
const models = require('../models');

describe('Mail API', () => {
  let app = null;
  const mockServerSettings = { port: 3000 };
  const mockRepo = {
    sendMail: (payload) => Promise.resolve(payload),
  };

  beforeEach(() => {
    const container = createContainer();

    container.register({
      repo: asValue(mockRepo),
      validate: asValue(models.validate),
      serverSettings: asValue(mockServerSettings),
    });

    return server.start(container).then((serv) => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can send email', (done) => {
    request(app)
      .post('/mail/send-mail')
      .send({
        to: 'abc@gmail.com',
        subject: 'Test microservices',
        text: 'Test send mail using micoservices',
      })
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
