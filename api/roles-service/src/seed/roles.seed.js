const { Role } = require('../models');

const data = [
  { alias: 'superadmin', name: 'SuperAdmin', priority: 0 },
  { alias: 'admin', name: 'Admin', priority: 1 },
  { alias: 'user', name: 'User', priority: 10 },
  { alias: 'community-member', name: 'Community Member', priority: 11 },
];

module.exports = async () => {
  console.log(`Seeding Roles...`);
  const count = await Role.countDocuments({});

  if (count === 0) {
    await Role.create(data);
    console.log(`Seed Roles success!`);
    return;
  } else {
    console.log(`Seed Roles failed! You have to drop Roles collection manually before running seed`);
  }

  console.log(`Seed Roles finish!`);
};
