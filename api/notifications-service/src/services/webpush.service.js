const supertest = require('supertest');

module.exports = (payload) => {
  return new Promise((resolve, reject) => {
    reject();
    // supertest("https://192.168.99.100:8080")
    //   .post("/notification/sendEmail")
    //   .send({ payload })
    //   .end((error, res) => {
    //     if (error) {
    //       reject(
    //         new Error("An error occured with payment service, error: " + error)
    //       );
    //     }
    //     resolve(res.body);
    //   });
  });
};
