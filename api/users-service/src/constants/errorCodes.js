const prefix = process.env.PORT;

module.exports = Object.create({
  USER: {
    CREATE_FAILED: `${prefix}010`,
    GET_ALL_FAILED: `${prefix}011`,
    GET_ALL_BY_ROLE_ID_FAILED: `${prefix}012`,
    NOT_EXIST: `${prefix}013`,
    DELETE_FAILED: `${prefix}014`,
    EMAIL_OR_PASSWORD_INCORRECT: `${prefix}015`,
  },
});
