const prefix = process.env.PORT;

module.exports = Object.create({
  ROLE: {
    CREATE_FAILED: `${prefix}010`,
    GET_ALL_FAILED: `${prefix}011`,
    NOT_EXIST: `${prefix}012`,
    DELETE_FAILED: `${prefix}013`,
  },
  PERMISSION: {
    CREATE_FAILED: `${prefix}020`,
    GET_ALL_FAILED: `${prefix}021`,
    NOT_EXIST: `${prefix}022`,
    DELETE_FAILED: `${prefix}023`,
  },
});
