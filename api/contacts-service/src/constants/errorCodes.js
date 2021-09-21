const prefix = process.env.PORT;

module.exports = Object.create({
  CONTACT: {
    CREATE_FAILED: `${prefix}010`,
    GET_ALL_FAILED: `${prefix}011`,
    NOT_EXIST: `${prefix}012`,
    UPDATE_FAILED: `${prefix}013`,
    DELETE_FAILED: `${prefix}014`,
  },
  COMMUNITY_MEMBER: {
    NOT_EXIST: `${prefix}020`,
    BANNED: `${prefix}021`,
    GET_ALL_FAILED: `${prefix}022`,
    UPDATE_FAILED: `${prefix}023`,
    DELETE_FAILED: `${prefix}024`,
  },
  COMMUNITY_MEMBER_ACTIVITY: {
    NOT_EXIST: `${prefix}030`,
    GET_ALL_FAILED: `${prefix}031`,
    MEMBER_ACTIVITY_NOT_EXIST: `${prefix}032`,
    UPDATE_FAILED: `${prefix}033`,
    DELETE_FAILED: `${prefix}034`,
  },
});
