const prefix = process.env.PORT;

module.exports = Object.create({
  NEWS: {
    CREATE_FAILED: `${prefix}010`,
    GET_ALL_FAILED: `${prefix}011`,
    NOT_EXIST: `${prefix}012`,
    UPDATE_FAILED: `${prefix}014`,
    DELETE_FAILED: `${prefix}015`,
    SLUG_IN_USED: `${prefix}016`,
  },
  CATEGORY: {
    CREATE_FAILED: `${prefix}020`,
    GET_ALL_FAILED: `${prefix}021`,
    NOT_EXIST: `${prefix}022`,
    UPDATE_FAILED: `${prefix}024`,
    DELETE_FAILED: `${prefix}025`,
    SLUG_IN_USED: `${prefix}026`,
  },
  AUTHOR: {
    CREATE_FAILED: `${prefix}030`,
    GET_ALL_FAILED: `${prefix}031`,
    NOT_EXIST: `${prefix}032`,
    UPDATE_FAILED: `${prefix}034`,
    DELETE_FAILED: `${prefix}035`,
  },
  COMMENT: {
    CREATE_FAILED: `${prefix}030`,
    GET_ALL_FAILED: `${prefix}031`,
    NOT_EXIST: `${prefix}032`,
    UPDATE_FAILED: `${prefix}034`,
    DELETE_FAILED: `${prefix}035`,
  },
});
