const fs = require('fs');

const repository = (container) => {
  const File = container.resolve('File');
  const logError = container.resolve('logError');
  const googleDriveService = container.resolve('googleDriveService');

  const uploadFiles = async (files, directory, options = { public: false }) => {
    try {
      const data = [];
      const count = files.length;
      const folderName = directory || 'eastwest-upload-files';
      let folder = await googleDriveService.searchFolder(folderName);
      if (!folder) {
        folder = await googleDriveService.createFolder(folderName);
      }
      for (let i = 0; i < count; i++) {
        // upload file to google drive
        const ggUploadFile = await googleDriveService.uploadFile(
          files[i].filename,
          files[i].path,
          files[i].mimetype,
          folder.id,
        );
        // save File model to database
        const obj = {
          size: files[i].size,
          path: files[i].path,
          name: files[i].filename,
          mimetype: files[i].mimetype,
          uploadName: files[i].originalname,
          googleDriveId: ggUploadFile.id,
          public: options.public,
        };
        const file = await File.create(obj);
        data.push({ ...obj, id: file.id, fieldName: files[i].fieldname });
        // remove local file after upload and store in db
        fs.unlinkSync(files[i].path);
      }

      return { count, data };
    } catch (error) {
      logError('An error occured uploading files', error, {
        files,
        directory,
        options,
      });
      throw error;
    }
  };

  const downloadFile = async (id, queries = {}) => {
    let file;
    try {
      file = await File.findOne({ _id: id, ...queries });
      if (!file) {
        throw 'File does not exist';
      }
      const directory = file.path.substring(0, file.path.lastIndexOf('/'));
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      await googleDriveService.downloadFile(file.googleDriveId, file.path);

      return file;
    } catch (error) {
      logError('An error occured downloading file', error, { id, queries });
      throw error;
    }
  };

  const deleteFile = async (id) => {
    try {
      const file = await File.findOne({ _id: id });
      if (file) {
        await googleDriveService.deleteFile(file.googleDriveId);
        await File.deleteOne({ _id: id });
      }
    } catch (error) {
      logError('An error occured removing file', error, { id });
      throw error;
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    uploadFiles,
    downloadFile,
    deleteFile,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject(new Error('connection db not supplied!'));
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
