const supertest = require('supertest');

const settings = {
  HOST: process.env.FILES_SERVICE_HOST || 'localhost',
  PORT: process.env.FILES_SERVICE_PORT || 3001,
};

const uploadPublicFiles = async (files) => {
  try {
    const listFields = Object.keys(files);
    const uploadFiles = supertest(`http://${settings.HOST}:${settings.PORT}`)
      .post('/files/public')
      .field('directory', 'news-and-media');
    listFields.forEach((field) => {
      files[field].forEach((file) => {
        uploadFiles.attach(file.fieldname, file.buffer, file.originalname);
      });
    });
    const response = await uploadFiles;

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with files service', details: error };
  }
};

const deteleFile = async (token, fileId) => {
  try {
    const response = await supertest(`http://${settings.HOST}:${settings.PORT}`)
      .delete(`/files/${fileId}`)
      .set('Authorization', `Bearer ${token}`);

    if (response.status >= 400) {
      throw response.body.error;
    }

    return response.body;
  } catch (error) {
    throw { msg: 'An error occured with files service', details: error };
  }
};

module.exports = Object.assign({
  uploadPublicFiles,
  deteleFile,
});
