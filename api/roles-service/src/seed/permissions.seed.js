const { Role, Permission } = require('../models');

const generatePermission = (role, resource, action, scope) => ({
  roleId: role.id,
  resource,
  action,
  scope,
  shortDes: [role.alias, action, scope, resource].join('-'),
});

const generateAdminPermissions = (role) => [
  generatePermission(role, 'role', 'create', 'any'),
  generatePermission(role, 'role', 'read', 'any'),
  generatePermission(role, 'role', 'update', 'any'),
  generatePermission(role, 'role', 'delete', 'any'),
  generatePermission(role, 'permission', 'create', 'any'),
  generatePermission(role, 'permission', 'read', 'any'),
  generatePermission(role, 'permission', 'update', 'any'),
  generatePermission(role, 'permission', 'delete', 'any'),
  generatePermission(role, 'user', 'create', 'any'),
  generatePermission(role, 'user', 'read', 'any'),
  generatePermission(role, 'user', 'update', 'any'),
  generatePermission(role, 'user', 'delete', 'any'),
  generatePermission(role, 'prospect', 'create', 'any'),
  generatePermission(role, 'prospect', 'read', 'any'),
  generatePermission(role, 'prospect', 'update', 'any'),
  generatePermission(role, 'prospect', 'delete', 'any'),
  generatePermission(role, 'contact', 'create', 'any'),
  generatePermission(role, 'contact', 'read', 'any'),
  generatePermission(role, 'contact', 'update', 'any'),
  generatePermission(role, 'contact', 'delete', 'any'),
  generatePermission(role, 'community-member', 'create', 'any'),
  generatePermission(role, 'community-member', 'read', 'any'),
  generatePermission(role, 'community-member', 'update', 'any'),
  generatePermission(role, 'community-member', 'delete', 'any'),
  generatePermission(role, 'community-member-activity', 'create', 'any'),
  generatePermission(role, 'community-member-activity', 'read', 'any'),
  generatePermission(role, 'community-member-activity', 'update', 'any'),
  generatePermission(role, 'community-member-activity', 'delete', 'any'),
  generatePermission(role, 'vacancy', 'create', 'any'),
  generatePermission(role, 'vacancy', 'read', 'any'),
  generatePermission(role, 'vacancy', 'update', 'any'),
  generatePermission(role, 'vacancy', 'delete', 'any'),
  generatePermission(role, 'vacancy-category', 'create', 'any'),
  generatePermission(role, 'vacancy-category', 'read', 'any'),
  generatePermission(role, 'vacancy-category', 'update', 'any'),
  generatePermission(role, 'vacancy-category', 'delete', 'any'),
  generatePermission(role, 'vacancy-application', 'create', 'any'),
  generatePermission(role, 'vacancy-application', 'read', 'any'),
  generatePermission(role, 'vacancy-application', 'update', 'any'),
  generatePermission(role, 'vacancy-application', 'delete', 'any'),
  generatePermission(role, 'file', 'create', 'any'),
  generatePermission(role, 'file', 'read', 'any'),
  generatePermission(role, 'file', 'update', 'any'),
  generatePermission(role, 'file', 'delete', 'any'),
  generatePermission(role, 'news', 'create', 'any'),
  generatePermission(role, 'news', 'read', 'any'),
  generatePermission(role, 'news', 'update', 'any'),
  generatePermission(role, 'news', 'delete', 'any'),
  generatePermission(role, 'news-category', 'create', 'any'),
  generatePermission(role, 'news-category', 'read', 'any'),
  generatePermission(role, 'news-category', 'update', 'any'),
  generatePermission(role, 'news-category', 'delete', 'any'),
  generatePermission(role, 'news-author', 'create', 'any'),
  generatePermission(role, 'news-author', 'read', 'any'),
  generatePermission(role, 'news-author', 'update', 'any'),
  generatePermission(role, 'news-author', 'delete', 'any'),
  generatePermission(role, 'news-comment', 'create', 'any'),
  generatePermission(role, 'news-comment', 'read', 'any'),
  generatePermission(role, 'news-comment', 'update', 'any'),
  generatePermission(role, 'news-comment', 'delete', 'any'),
];

const generateUserPermissions = (role) => [
  generatePermission(role, 'user', 'read', 'own'),
  generatePermission(role, 'user', 'update', 'own'),
];

const generateCommunityMemberPermissions = (role) => [
  generatePermission(role, 'role', 'read', 'any'),
  generatePermission(role, 'community-member', 'read', 'own'),
  generatePermission(role, 'community-member', 'update', 'own'),
  generatePermission(role, 'community-member-activity', 'create', 'own'),
  generatePermission(role, 'news', 'read', 'any'),
  generatePermission(role, 'news-comment', 'create', 'any'),
  generatePermission(role, 'news-comment', 'read', 'any'),
  generatePermission(role, 'news-comment', 'update', 'own'),
  generatePermission(role, 'news-comment', 'delete', 'own'),
];

module.exports = async () => {
  const roleLength = await Role.countDocuments({});
  const permissionLength = await Permission.countDocuments({});

  if (roleLength > 0 && permissionLength === 0) {
    console.log(`Seeding Permissions...`);
    const superAdminRole = await Role.findOne(
      { alias: 'superadmin' },
      { alias: 1 },
    );
    const adminRole = await Role.findOne({ alias: 'admin' }, { alias: 1 });
    const userRole = await Role.findOne({ alias: 'user' }, { alias: 1 });
    const communityMemberRole = await Role.findOne(
      { alias: 'community-member' },
      { alias: 1 },
    );

    const superAdminPermissions = await Permission.create(
      generateAdminPermissions(superAdminRole),
    );
    const adminPermissions = await Permission.create(
      generateAdminPermissions(adminRole),
    );
    const userPermissions = await Permission.create(
      generateUserPermissions(userRole),
    );
    const communityMemberPermissions = await Permission.create(
      generateCommunityMemberPermissions(communityMemberRole),
    );

    await Role.findOneAndUpdate(
      { _id: superAdminRole.id },
      { $push: { permissions: { $each: superAdminPermissions } } },
    );
    await Role.findOneAndUpdate(
      { _id: adminRole.id },
      { $push: { permissions: { $each: adminPermissions } } },
    );
    await Role.findOneAndUpdate(
      { _id: userRole.id },
      { $push: { permissions: { $each: userPermissions } } },
    );
    await Role.findOneAndUpdate(
      { _id: communityMemberRole.id },
      { $push: { permissions: { $each: communityMemberPermissions } } },
    );

    console.log(`Seed Permisisons success!`);
    return;
  } else {
    console.log(
      `Seed Permissions failed! You have to drop Permissions collection manually before running seed`,
    );
  }

  console.log(`Seed Permisisons finish!`);
};
