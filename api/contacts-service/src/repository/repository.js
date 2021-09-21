const repository = (container) => {
  const Contact = container.resolve('Contact');
  const CommunityMember = container.resolve('CommunityMember');
  const CommunityMemberActivity = container.resolve('CommunityMemberActivity');
  const logError = container.resolve('logError');
  const errorCodes = container.resolve('errorCodes');
  const rolesService = container.resolve('rolesService');
  const authService = container.resolve('authService');
  const notificationsService = container.resolve('notificationsService');

  const createContact = async (data) => {
    try {
      const contact = await Contact.create(data);
      await notificationsService.createNewContactEmail(contact);

      return contact;
    } catch (error) {
      logError('An error occured creating contact', error, data);
      throw {
        code: errorCodes.CONTACT.CREATE_FAILED,
        msg: 'Can not create contact',
        details: error,
      };
    }
  };

  const getContacts = async ({
    skip = 0,
    limit = 20,
    sort = {},
    ...filter
  }) => {
    try {
      const data = await Contact.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await Contact.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all contacts', error, { filter });
      throw {
        code: errorCodes.CONTACT.GET_ALL_FAILED,
        msg: 'Can not get list contacts',
        details: error,
      };
    }
  };

  const getContactById = async (id) => {
    try {
      const contact = await Contact.findOne({ _id: id });
      if (!contact) {
        throw {
          code: errorCodes.CONTACT.NOT_EXIST,
          msg: 'Contact does not exist',
        };
      }

      return contact;
    } catch (error) {
      logError('An error occured fetching contact', error, { id });
      throw error;
    }
  };

  const deleteContact = async (id) => {
    try {
      await Contact.deleteOne({ _id: id });
    } catch (error) {
      logError('An error occured removing contact', error, { id });
      throw {
        code: errorCodes.CONTACT.DELETE_FAILED,
        msg: 'Can not delete contact',
        details: error,
      };
    }
  };

  const loginAsCommunityMember = async ({ socialId, emailAddress }) => {
    try {
      const member = await CommunityMember.findOne({ socialId, emailAddress })
        .lean()
        .populate('roles', { alias: 1 });
      if (!member) {
        throw {
          code: errorCodes.COMMUNITY_MEMBER.NOT_EXIST,
          msg: "Member doesn't exists",
        };
      }
      if (member.status === 'banned') {
        throw {
          code: errorCodes.COMMUNITY_MEMBER.BANNED,
          msg: 'Member banned',
        };
      }

      const response = await authService.generateToken({
        userId: member._id,
        emailAddress: member.emailAddress,
        roles: member.roles.map((role) => role.alias),
        resource: 'CommunityMember',
      });

      return response;
    } catch (error) {
      logError('An error occured login as member', error, {
        socialId,
        emailAddress,
      });
      throw error;
    }
  };

  const createMember = async (data) => {
    try {
      let member;
      let token;
      const memberRoleAlias = 'community-member';
      member = await CommunityMember.findOne({ socialId: data.socialId });
      if (member) {
        if (member.status === 'banned') {
          throw {
            code: errorCodes.COMMUNITY_MEMBER.BANNED,
            msg: 'Member banned',
          };
        } else {
          member = await CommunityMember.findOneAndUpdate(
            { _id: member._id },
            { ...data, status: 'active' },
            { runValidators: true, new: true },
          );
        }
      } else {
        member = await CommunityMember.create(data);
      }

      const response = await authService.generateToken({
        userId: member._id,
        emailAddress: member.emailAddress,
        roles: [memberRoleAlias],
        resource: 'CommunityMember',
      });
      token = response.token;

      if (member.roles.length === 0) {
        const memberRole = await rolesService.getRoleByAlias(
          token,
          memberRoleAlias,
        );
        member = await CommunityMember.findOneAndUpdate(
          { _id: member._id },
          { $push: { roles: memberRole.id } },
        );
      }

      return member;
    } catch (error) {
      logError('An error occured creating member', error, { data });
      throw error;
    }
  };

  const getMembers = async ({ skip = 0, limit = 20, sort = {}, ...filter }) => {
    try {
      const data = await CommunityMember.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await CommunityMember.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all members', error, { filter });
      throw {
        code: errorCodes.COMMUNITY_MEMBER.GET_ALL_FAILED,
        msg: 'Can not get list members',
        details: error,
      };
    }
  };

  const getMemberById = async (id) => {
    try {
      const member = await CommunityMember.findOne({ _id: id });
      if (!member) {
        throw {
          code: errorCodes.COMMUNITY_MEMBER.NOT_EXIST,
          msg: 'Member does not exist',
        };
      }

      return member;
    } catch (error) {
      logError('An error occured fetching member', error, { id });
      throw error;
    }
  };

  const updateMember = async (paramId, member) => {
    try {
      const { id, ...newData } = member;
      if (paramId !== id) {
        throw "Updated member's id does not match with param";
      }
      const data = await CommunityMember.findOneAndUpdate(
        { _id: id },
        newData,
        { runValidators: true, new: true },
      );

      return data;
    } catch (error) {
      logError('An error occured updating member by id', error, {
        paramId,
        member,
      });
      throw {
        code: errorCodes.COMMUNITY_MEMBER.UPDATE_FAILED,
        msg: 'Can not update member',
        details: error,
      };
    }
  };

  const deleteMember = async (token, id) => {
    try {
      await CommunityMemberActivity.deleteMany({ member: id });
      await CommunityMember.deleteOne({ _id: id });
    } catch (error) {
      logError('An error occured removing member', error, { token, id });
      throw {
        code: errorCodes.COMMUNITY_MEMBER.DELETE_FAILED,
        msg: 'Can not delete member',
        details: error,
      };
    }
  };

  const createMemberActivity = async (memberId, data) => {
    try {
      const member = await CommunityMember.findOne({ _id: memberId });
      if (!member) {
        throw {
          code: errorCodes.COMMUNITY_MEMBER_ACTIVITY.NOT_EXIST,
          msg: 'Member does not exist',
        };
      }
      const activity = await CommunityMemberActivity.create({
        ...data,
        member: memberId,
      });
      await CommunityMember.findOneAndUpdate(
        { _id: memberId },
        { activities: [...member.activities, activity._id] },
        { runValidators: true, new: true },
      );

      return activity;
    } catch (error) {
      logError(`An error occured creating activity`, error, {
        memberId,
        activity: data,
      });
      throw error;
    }
  };

  const getMemberActivities = async ({
    skip = 0,
    limit = 20,
    sort = {},
    ...filter
  }) => {
    try {
      const data = await CommunityMemberActivity.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await CommunityMemberActivity.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all activities', error, filter);
      throw {
        code: errorCodes.COMMUNITY_MEMBER_ACTIVITY.GET_ALL_FAILED,
        msg: 'Can not get list activities',
        details: error,
      };
    }
  };

  const getMemberActivityById = async (memberId, activityId) => {
    try {
      const activity = await CommunityMemberActivity.findOne({
        _id: activityId,
        member: memberId,
      });
      if (!activity) {
        throw {
          code: errorCodes.COMMUNITY_MEMBER_ACTIVITY.MEMBER_ACTIVITY_NOT_EXIST,
          msg: 'Activity does not exist',
        };
      }

      return activity;
    } catch (error) {
      logError('An error occured fetching activity', error, {
        memberId,
        activityId,
      });
      throw error;
    }
  };

  const deleteMemberActivity = async (memberId, activityId) => {
    try {
      await CommunityMemberActivity.deleteOne({
        _id: activityId,
        member: memberId,
      });
    } catch (error) {
      logError('An error occured removing activity', error, {
        memberId,
        activityId,
      });
      throw error;
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    createContact,
    getContacts,
    getContactById,
    deleteContact,
    loginAsCommunityMember,
    createMember,
    getMembers,
    getMemberById,
    updateMember,
    deleteMember,
    createMemberActivity,
    getMemberActivities,
    getMemberActivityById,
    deleteMemberActivity,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject(new Error('connection db not supplied!'));
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
