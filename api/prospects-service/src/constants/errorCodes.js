const prefix = process.env.PORT;

module.exports = Object.create({
  PROSPECT: {
    CREATE_FAILED: `${prefix}010`,
    GET_ALL_FAILED: `${prefix}011`,
    NOT_EXIST: `${prefix}012`,
    DELETE_FAILED: `${prefix}013`,
  },
});
