const repository = (container) => {
  const logError = container.resolve('logError');
  const errorCodes = container.resolve('errorCodes');
  const Prospect = container.resolve('Prospect');
  const notificationsService = container.resolve('notificationsService');

  const createProspect = async (data) => {
    try {
      const prospect = await Prospect.create(data);
      await notificationsService.createNewProspectEmail(prospect);

      return prospect;
    } catch (error) {
      logError('An error occured creating prospect', error, data);
      throw {
        code: errorCodes.PROSPECT.CREATE_FAILED,
        msg: 'Can not create prospect',
        details: error,
      };
    }
  };

  const getProspects = async ({
    skip = 0,
    limit = 20,
    sort = {},
    ...filter
  }) => {
    try {
      const data = await Prospect.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await Prospect.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all prospects', error, filter);
      throw {
        code: errorCodes.PROSPECT.GET_ALL_FAILED,
        msg: 'Can not get list prospects',
        details: error,
      };
    }
  };

  const getProspectById = async (id) => {
    try {
      const prospect = await Prospect.findOne({ _id: id });
      if (!prospect) {
        throw {
          code: errorCodes.PROSPECT.NOT_EXIST,
          msg: 'Prospect does not exist',
        };
      }

      return prospect;
    } catch (error) {
      logError('An error occured fetching prospect', error, { id });
      throw error;
    }
  };

  const deleteProspect = async (id) => {
    try {
      await Prospect.deleteOne({ _id: id });
    } catch (error) {
      logError('An error occured removing prospect', error, { id });
      throw {
        code: errorCodes.PROSPECT.DELETE_FAILED,
        msg: 'Can not delete prospect',
        details: error,
      };
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    createProspect,
    getProspects,
    getProspectById,
    deleteProspect,
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
