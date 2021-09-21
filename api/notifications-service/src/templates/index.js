const path = require('path');
const ejs = require('ejs');

const renderEmail = async (fileName, data) => {
  try {
    const filePath = path.resolve(
      path.join(__dirname, 'email', `${fileName}.ejs`),
    );
    const html = await ejs.renderFile(filePath, data);

    return html;
  } catch (error) {
    throw new Error(
      `An error occured rendering email template ${fileName}.ejs, error: ${error}`,
    );
  }
};

module.exports = Object.create({ renderEmail });
