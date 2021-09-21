const prefix = process.env.PORT;

module.exports = Object.create({
  GENERATE_TOKEN: {
    GENERATE_FAILED: `${prefix}010`,
  },
  VERIFY_TOKEN: {
    TOKEN_EMPTY: `${prefix}020`,
    USER_ID_NOT_FOUND: `${prefix}021`,
    RESOURCE_NOT_FOUND: `${prefix}022`,
    USER_NOT_EXIST: `${prefix}023`,
    USER_ROLES_EMPTY: `${prefix}024`,
    USER_ROLES_CHANGED: `${prefix}025`,
  },
  VERIFY_PERMISSIONS: {
    ROLE_NOT_FOUND: `${prefix}030`,
  },
});
