const bcrypt = require('bcrypt');
const { User, Role } = require('../models');

module.exports = async () => {
  console.log(`Seeding Users...`);
  const roleLength = await Role.countDocuments({});
  const userLength = await User.countDocuments({});

  if (roleLength === 0) {
    console.log(`Seed Users failed! Roles collection is empty`);
  } else if (userLength === 0) {
    const superAdminRole = await Role.findOne(
      { alias: 'superadmin' },
      { _id: 1 },
    );
    const adminRole = await Role.findOne({ alias: 'admin' }, { _id: 1 });
    const userRole = await Role.findOne({ alias: 'user' }, { _id: 1 });
    const data = [
      {
        firstName: 'Rabih',
        lastName: 'Souk',
        emailAddress: 'rabih.souk@eastwest.live',
        password: bcrypt.hashSync('123456', 10),
        roles: [superAdminRole.id],
      },
      {
        firstName: 'Hai',
        lastName: 'Bui',
        emailAddress: 'hai.bui@eastwest.live',
        password: bcrypt.hashSync('123456', 10),
        roles: [adminRole.id],
      },
      {
        firstName: 'Hai',
        lastName: 'Bui',
        emailAddress: 'stony2207@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        roles: [userRole.id],
      },
    ];

    await User.create(data);
    console.log(`Seed Users success!`);
    return;
  } else {
    console.log(
      `Seed Users failed! You have to drop Users collection manually before running seed`,
    );
  }

  console.log(`Seed Users finish!`);
};
