const repository = (container) => {
  const Vacancy = container.resolve('Vacancy');
  const Category = container.resolve('Category');
  const Application = container.resolve('Application');
  const errorCodes = container.resolve('errorCodes');
  const logError = container.resolve('logError');
  const filesService = container.resolve('filesService');
  const notificationsService = container.resolve('notificationsService');

  const createCategory = async (data) => {
    try {
      const category = await Category.create(data);

      return category;
    } catch (error) {
      logError('An error occured creating category', error, data);
      throw {
        code: errorCodes.CATEGORY.CREATE_FAILED,
        msg: 'Can not create category',
        details: error,
      };
    }
  };

  const getCategories = async ({
    skip = 0,
    limit = 20,
    sort = {},
    ...filter
  }) => {
    try {
      const data = await Category.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await Category.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all categories', error, filter);
      throw {
        code: errorCodes.CATEGORY.GET_ALL_FAILED,
        msg: 'Can not get list categories',
        details: error,
      };
    }
  };

  const getCategoryById = async (id) => {
    try {
      const data = await Category.findOne({ _id: id });
      if (!data) {
        throw {
          code: errorCodes.CATEGORY.NOT_EXIST,
          msg: 'Category does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching category by id', error, { id });
      throw error;
    }
  };

  const updateCategory = async (paramId, category) => {
    try {
      const { id, ...newData } = category;
      if (paramId !== id) {
        throw "Updated category's id does not match with param";
      }
      const data = await Category.findOneAndUpdate({ _id: id }, newData, {
        runValidators: true,
        new: true,
      });

      return data;
    } catch (error) {
      logError('An error occured updating category by id', error, {
        paramId,
        category,
      });
      throw {
        code: errorCodes.CATEGORY.UPDATE_FAILED,
        msg: 'Can not update category',
        details: error,
      };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      logError('An error occured removing category', error, { id });
      throw {
        code: errorCodes.CATEGORY.DELETE_FAILED,
        msg: 'Can not delete category',
        details: error,
      };
    }
  };

  const createVacancy = async (data) => {
    try {
      const existedVacancy = await Vacancy.findOne({ slug: data.slug });
      if (existedVacancy) {
        throw {
          code: errorCodes.VACANCY.SLUG_IN_USED,
          msg: 'Slug has been used',
        };
      }
      const vacancy = await Vacancy.create(data);

      return vacancy;
    } catch (error) {
      logError('An error occured creating vacancy', error, data);
      throw {
        code: errorCodes.VACANCY.CREATE_FAILED,
        msg: 'Can not create vacancy',
        details: error,
      };
    }
  };

  const getVacancies = async ({
    skip = 0,
    limit = 20,
    sort = {},
    ...filter
  }) => {
    try {
      const data = await Vacancy.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await Vacancy.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all vacancies', error, filter);
      throw {
        code: errorCodes.VACANCY.GET_ALL_FAILED,
        msg: 'Can not get list vacancies',
        details: error,
      };
    }
  };

  const getVacancyBySlug = async (slug) => {
    try {
      const data = await Vacancy.findOne({ slug });
      if (!data) {
        throw {
          code: errorCodes.VACANCY.NOT_EXIST,
          msg: 'Vacancy does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching vacancy with slug', error, { slug });
      throw error;
    }
  };

  const getVacancyById = async (id) => {
    try {
      const data = await Vacancy.findOne({ _id: id });
      if (!data) {
        throw {
          code: errorCodes.VACANCY.NOT_EXIST,
          msg: 'Vacancy does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching vacancy by id', error, { id });
      throw error;
    }
  };

  const updateVacancy = async (paramId, vacancy) => {
    try {
      const { id, ...newData } = vacancy;
      if (paramId !== id) {
        throw "Updated vacancy's id does not match with param";
      }
      const existedVacancy = await Vacancy.findOne({ slug: newData.slug });
      if (existedVacancy && existedVacancy.id !== paramId) {
        throw {
          code: errorCodes.VACANCY.SLUG_IN_USED,
          msg: 'Slug has been used',
        };
      }
      const data = await Vacancy.findOneAndUpdate({ _id: id }, newData, {
        runValidators: true,
        new: true,
      });

      return data;
    } catch (error) {
      logError('An error occured updating vacancy', error, {
        paramId,
        vacancy,
      });
      throw {
        code: errorCodes.VACANCY.UPDATE_FAILED,
        msg: 'Can not update vacancy',
        details: error,
      };
    }
  };

  const deleteVacancy = async (id) => {
    try {
      await Vacancy.deleteOne({ _id: id });
    } catch (error) {
      logError('An error occured removing vacancy', error, { id });
      throw {
        code: errorCodes.VACANCY.DELETE_FAILED,
        msg: 'Can not delete vacancy',
        details: error,
      };
    }
  };

  const createApplication = async (data, uploadFiles) => {
    try {
      // If user already submitted application
      // We no need create and upload files again
      const existedApplication = await Application.findOne({
        emailAddress: data.emailAddress,
        vacancy: data.vacancy,
      });
      if (existedApplication) {
        await notificationsService.resendApplicationEmail(existedApplication);
        return existedApplication;
      }

      const files = await filesService.uploadPublicFiles(uploadFiles);
      const avatar = files.data.find((i) => i.fieldName === 'avatar');
      const resumes = files.data.filter((i) => i.fieldName === 'resumes');
      if (!avatar) {
        throw 'Avatar is required';
      }
      if (!resumes || resumes.length === 0) {
        throw 'Resumes is required';
      }
      const obj = {
        ...data,
        avatar: avatar.id,
        resumes: resumes.map((r) => r.id),
      };
      const application = await Application.create(obj);
      await notificationsService.createNewApplicationEmail(application);

      return application;
    } catch (error) {
      logError('An error occured creating application', error, data);
      throw {
        code: errorCodes.APPLICATION.CREATE_FAILED,
        msg: 'Can not create application',
        details: error,
      };
    }
  };

  const getApplications = async ({
    skip = 0,
    limit = 20,
    sort = {},
    ...filter
  }) => {
    try {
      const data = await Application.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await Application.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all applications', error, filter);
      throw {
        code: errorCodes.APPLICATION.GET_ALL_FAILED,
        msg: 'Can not get list appliations',
        details: error,
      };
    }
  };

  const getApplicationById = async (id) => {
    try {
      const data = await Application.findOne({ _id: id });
      if (!data) {
        throw {
          code: errorCodes.APPLICATION.NOT_EXIST,
          msg: 'Application does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching application', error, { id });
      throw error;
    }
  };

  // TODO: We have update function for application
  // But in this case not necessary for admin to edit it, so we ignore it for this time
  // const updateApplication = async (paramId, application) => {
  //   try {
  //     const { id, ...newData } = application;
  //     if (paramId !== id) {
  //       throw "Updated application's id does not match with param";
  //     }
  //     const data = await Application.findOneAndUpdate({ _id: id }, newData, {
  //       runValidators: true,
  //       new: true,
  //     });

  //     return data;
  //   } catch (error) {
  //     logError('An error occured updating application', error, { paramId, application });
  //     throw error;
  //   }
  // };

  const deleteApplication = async (id) => {
    try {
      await Application.deleteOne({ _id: id });
    } catch (error) {
      logError('An error occured removing application', error, { id });
      throw {
        code: errorCodes.APPLICATION.DELETE_FAILED,
        msg: 'Can not delete application',
        details: error,
      };
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createVacancy,
    getVacancies,
    getVacancyBySlug,
    getVacancyById,
    updateVacancy,
    deleteVacancy,
    createApplication,
    getApplications,
    getApplicationById,
    // updateApplication,
    deleteApplication,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject('connection db not supplied!');
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
