const logError = (message, error, data = undefined) => {
  console.group(message);
  console.group('Error:');
  console.log(JSON.stringify(error, 0, 2));
  if (data) {
    console.group('Input details:');
    console.log(JSON.stringify(data, 0, 2));
    console.groupEnd();
  }
  console.groupEnd();
};

module.exports = logError;
