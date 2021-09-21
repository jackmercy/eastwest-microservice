const fs = require('fs');
const { google } = require('googleapis');

const settings = {
  CLIENT_ID: process.env.GG_DRIVE_CLIENT_ID,
  CLIENT_SECRET: process.env.GG_DRIVE_CLIENT_SECRET,
  REFRESH_TOKEN: process.env.GG_DRIVE_REFRESH_TOKEN,
  REDIRECT_URI: 'https://developers.google.com/oauthplayground',
};

const auth = new google.auth.OAuth2(
  settings.CLIENT_ID,
  settings.CLIENT_SECRET,
  settings.REDIRECT_URI,
);
auth.setCredentials({ refresh_token: settings.REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth });

const createFolder = async (folderName) => {
  try {
    const response = await drive.files.create({
      resource: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      },
      fields: 'id',
    });

    return response.data || response;
  } catch (error) {
    throw {
      msg: 'An error occured with google drive service',
      details:
        (error.response &&
          error.response.data &&
          error.response.data.error_description) ||
        error.toString(),
    };
  }
};

const searchFolder = async (folderName) => {
  try {
    const response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed = false`,
      fields: 'files(id, name)',
    });

    return response.data.files ? response.data.files[0] : null;
  } catch (error) {
    throw {
      msg: 'An error occured with google drive service',
      details:
        (error.response &&
          error.response.data &&
          error.response.data.error_description) ||
        error.toString(),
    };
  }
};

const uploadFile = async (
  fileName,
  filePath,
  fileMimeType,
  folderId = undefined,
) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: fileMimeType,
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: fileMimeType,
        body: fs.createReadStream(filePath),
      },
    });

    return response.data;
  } catch (error) {
    throw {
      msg: 'An error occured with google drive service',
      details:
        (error.response &&
          error.response.data &&
          error.response.data.error_description) ||
        error.toString(),
    };
  }
};

const downloadFile = async (fileId, filePath) => {
  try {
    const file = fs.createWriteStream(filePath);
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' },
    );
    await Promise.all([
      new Promise((resolve, reject) => {
        response.data
          .on('end', () => {
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          })
          .pipe(file);
      }),
      new Promise((resolve, reject) => {
        file
          .on('finish', () => {
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
      }),
    ]);
  } catch (error) {
    throw {
      msg: 'An error occured with google drive service',
      details:
        (error.response &&
          error.response.data &&
          error.response.data.error_description) ||
        error.toString(),
    };
  }
};

const deleteFile = async (fileId) => {
  try {
    await drive.files.delete({ fileId });
  } catch (error) {
    throw {
      msg: 'An error occured with google drive service',
      details:
        (error.response &&
          error.response.data &&
          error.response.data.error_description) ||
        error.toString(),
    };
  }
};

module.exports = {
  createFolder,
  searchFolder,
  uploadFile,
  downloadFile,
  deleteFile,
};
