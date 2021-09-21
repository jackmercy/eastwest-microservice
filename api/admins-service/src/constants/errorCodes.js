const prefix = process.env.PORT;

module.exports = Object.create({
  LOGIN: {
    EMPTY_ROLE: `${prefix}010`,
    ROLE_NOT_ALLOWED: `${prefix}011`,
  },
});
