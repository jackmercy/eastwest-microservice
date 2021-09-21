const repository = (container) => {
  const News = container.resolve('News');
  const Author = container.resolve('Author');
  const Comment = container.resolve('Comment');
  const Category = container.resolve('Category');
  const logError = container.resolve('logError');
  const errorCodes = container.resolve('errorCodes');
  const filesService = container.resolve('filesService');

  const createCategory = async (data) => {
    try {
      const existedCategory = await Category.findOne({ slug: data.slug });
      if (existedCategory) {
        throw {
          code: errorCodes.CATEGORY.SLUG_IN_USED,
          msg: 'Slug has been used',
        };
      }
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
      logError('An error occured removing category by id', error, { id });
      throw {
        code: errorCodes.CATEGORY.DELETE_FAILED,
        msg: 'Can not delete category',
        details: error,
      };
    }
  };

  const createNews = async (data, uploadFiles) => {
    try {
      const existedNews = await News.findOne({ slug: data.slug });
      if (existedNews) {
        throw {
          code: errorCodes.NEWS.SLUG_IN_USED,
          msg: 'Slug has been used',
        };
      }
      const files = await filesService.uploadPublicFiles(uploadFiles);
      const thumbnail = files.data.find((i) => i.fieldName === 'thumbnail');
      if (!thumbnail) {
        throw 'Thumbnail is required';
      }
      const news = await News.create({ ...data, thumbnail: thumbnail.id });

      return news;
    } catch (error) {
      logError('An error occured creating news', error, { data, uploadFiles });
      throw {
        code: errorCodes.NEWS.CREATE_FAILED,
        msg: 'Can not create news',
        details: error,
      };
    }
  };

  const getNews = async ({ skip = 0, limit = 20, sort = {}, ...filter }) => {
    try {
      const data = await News.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await News.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all news', error, filter);
      throw {
        code: errorCodes.NEWS.GET_ALL_FAILED,
        msg: 'Can not get list news',
        details: error,
      };
    }
  };

  const getNewsBySlug = async (slug) => {
    try {
      const data = await News.findOne({ slug });
      if (!data) {
        throw {
          code: errorCodes.NEWS.NOT_EXIST,
          msg: 'News does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching news with slug:', error, { slug });
      throw error;
    }
  };

  const getNewsById = async (id) => {
    try {
      const data = await News.findOne({ _id: id });
      if (!data) {
        throw {
          code: errorCodes.NEWS.NOT_EXIST,
          msg: 'News does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching news by id:', error, { id });
      throw error;
    }
  };

  const updateNews = async (token, paramId, news, uploadFiles) => {
    try {
      const { id, ...newData } = news;
      if (paramId !== id) {
        throw "Updated news's id does not match with param";
      }
      const existedNews = await News.findOne({ slug: newData.slug });
      if (existedNews && existedNews.id !== paramId) {
        throw {
          code: errorCodes.NEWS.SLUG_IN_USED,
          msg: 'Slug has been used',
        };
      }
      const obj = { ...newData };
      if (!obj.thumbnail && uploadFiles) {
        const oldData = await News.findOne({ _id: id });
        if (oldData.thumbnail) {
          await filesService.deteleFile(token, oldData.thumbnail);
        }
        const files = await filesService.uploadPublicFiles(uploadFiles);
        const thumbnail = files.data.find((i) => i.fieldName === 'thumbnail');
        if (!thumbnail) {
          throw 'Thumbnail is required';
        }
        obj.thumbnail = thumbnail.id;
      }

      const data = await News.findOneAndUpdate({ _id: id }, obj, {
        runValidators: true,
        new: true,
      });

      return data;
    } catch (error) {
      logError('An error occured updating news by id', error, {
        token,
        paramId,
        news,
        uploadFiles,
      });
      throw {
        code: errorCodes.NEWS.UPDATE_FAILED,
        msg: 'Can not update news',
        details: error,
      };
    }
  };

  // Same with update news, but limit fields updated and no need authentication
  // Using for landing page to update views, likes, ...
  // updatedAt field will be prevent auto update
  const updatePublicNews = async (paramId, news) => {
    try {
      const { id, ...newData } = news;
      if (paramId !== id) {
        throw "Updated news's id does not match with param";
      }

      // Limit updated fields avoid cheat/hack
      const obj = {
        views: newData.views,
        shares: newData.shares,
        // TODO: Currently we have'not implemented likes, comments feature yet
        // so we ignore them right here and enable later
        // likes: newData.likes,
      };

      const data = await News.findOneAndUpdate({ _id: id }, obj, {
        runValidators: true,
        new: true,
        timestamps: false,
      });

      return data;
    } catch (error) {
      logError('An error occured updating news by id', error, {
        paramId,
        news,
      });
      throw {
        code: errorCodes.NEWS.UPDATE_FAILED,
        msg: 'Can not update news',
        details: error,
      };
    }
  };

  const deleteNews = async (token, id) => {
    try {
      const news = await News.findOne({ _id: id });
      if (news) {
        await filesService.deteleFile(token, news.thumbnail);
        await Comment.deleteMany({ news: id });
        await News.deleteOne({ _id: id });
      }
    } catch (error) {
      logError('An error occured removing news by id', error, { token, news });
      throw {
        code: errorCodes.NEWS.DELETE_FAILED,
        msg: 'Can not delete news',
        details: error,
      };
    }
  };

  const createAuthor = async (data, uploadFiles) => {
    try {
      const files = await filesService.uploadPublicFiles(uploadFiles);
      const avatar = files.data.find((i) => i.fieldName === 'avatar');
      if (!avatar) {
        throw 'Avatar is required';
      }
      const author = await Author.create({
        ...data,
        avatar: avatar.id,
      });

      return author;
    } catch (error) {
      logError('An error occured creating author', error, {
        data,
        uploadFiles,
      });
      throw {
        code: errorCodes.AUTHOR.CREATE_FAILED,
        msg: 'Can not create author',
        details: error,
      };
    }
  };

  const getAuthors = async ({ skip = 0, limit = 20, sort = {}, ...filter }) => {
    try {
      const data = await Author.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await Author.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all authors', error, filter);
      throw {
        code: errorCodes.AUTHOR.GET_ALL_FAILED,
        msg: 'Can not get list authors',
        details: error,
      };
    }
  };

  const getAuthorById = async (id) => {
    try {
      const data = await Author.findOne({ _id: id });
      if (!data) {
        throw {
          code: errorCodes.AUTHOR.NOT_EXIST,
          msg: 'Author does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching author by id', error, { id });
      throw error;
    }
  };

  const updateAuthor = async (token, paramId, author, uploadFiles) => {
    try {
      const { id, ...newData } = author;
      if (paramId !== id) {
        throw "Updated author's id does not match with param";
      }
      const obj = { ...newData };
      if (!obj.avatar && uploadFiles) {
        const oldData = await Author.findOne({ _id: id });
        if (oldData.avatar) {
          await filesService.deteleFile(token, oldData.avatar);
        }
        const files = await filesService.uploadPublicFiles(uploadFiles);
        const avatar = files.data.find((i) => i.fieldName === 'avatar');
        if (!avatar) {
          throw 'Avatar is required';
        }
        obj.avatar = avatar.id;
      }

      const data = await Author.findOneAndUpdate({ _id: id }, obj, {
        runValidators: true,
        new: true,
      });

      return data;
    } catch (error) {
      logError('An error occured updating author by id', error, {
        token,
        paramId,
        author,
        uploadFiles,
      });
      throw {
        code: errorCodes.AUTHOR.UPDATE_FAILED,
        msg: 'Can not update author',
        details: error,
      };
    }
  };

  const deleteAuthor = async (token, id) => {
    try {
      const author = await Author.findOne({ _id: id });
      if (author) {
        if (author.avatar) {
          await filesService.deteleFile(token, author.avatar);
        }

        await Author.deleteOne({ _id: id });
      }
    } catch (error) {
      logError('An error occured removing author by id', error, { token, id });
      throw {
        code: errorCodes.AUTHOR.DELETE_FAILED,
        msg: 'Can not author category',
        details: error,
      };
    }
  };

  const createComment = async (newsId, data) => {
    try {
      if (newsId !== data.news) {
        throw 'News id not match';
      }
      const news = await News.findOne({ _id: newsId });
      if (!news) {
        throw 'News does not exist';
      }
      if (!news.commentAllowed) {
        throw 'News does not allow comment';
      }
      const comment = await Comment.create({
        ...data,
        status: news.commentNeedApproved ? 'pending' : 'approved',
      });
      if (data.parent) {
        await Comment.findOneAndUpdate(
          { _id: data.parent },
          { $push: { replies: comment._id } },
        );
      }

      return comment;
    } catch (error) {
      logError('An error occured creating comment', error, { newsId, data });
      throw {
        code: errorCodes.COMMENT.CREATE_FAILED,
        msg: 'Can not create comment',
        details: error,
      };
    }
  };

  const getComments = async (
    newsId,
    { skip = 0, limit = 20, sort = {}, populate = '', ...filter },
  ) => {
    try {
      const data = await Comment.find({ ...filter, news: newsId })
        .skip(Number(skip))
        .populate(populate)
        .limit(Number(limit))
        .sort(sort);
      const count = await Comment.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all comments', error, {
        newsId,
        filter,
        populate,
      });
      throw {
        code: errorCodes.COMMENT.GET_ALL_FAILED,
        msg: 'Can not get list comments',
        details: error,
      };
    }
  };

  const getCommentById = async (newsId, commentId) => {
    try {
      const data = await Comment.findOne({ _id: commentId });
      if (!data) {
        throw {
          code: errorCodes.COMMENT.NOT_EXIST,
          msg: 'Comment does not exist',
        };
      }

      return data;
    } catch (error) {
      logError('An error occured fetching comment by id', error, {
        newsId,
        commentId,
      });
      throw error;
    }
  };

  const updateComment = async (newsId, commentId, comment) => {
    try {
      const { id, news, ...newData } = comment;
      if (newsId !== news) {
        throw "Updated news's id does not match with param";
      }
      if (commentId !== id) {
        throw "Updated comment's id does not match with param";
      }
      const data = await Comment.findOneAndUpdate({ _id: id, news }, newData, {
        runValidators: true,
        new: true,
      });

      return data;
    } catch (error) {
      logError('An error occured updating comment by id', error, {
        newsId,
        commentId,
        comment,
      });
      throw {
        code: errorCodes.COMMENT.UPDATE_FAILED,
        msg: 'Can not update comment',
        details: error,
      };
    }
  };

  const deleteComment = async (newsId, commentId) => {
    try {
      await Comment.deleteMany({ parent: commentId, news: newsId });
      await Comment.deleteOne({ _id: commentId, news: newsId });
    } catch (error) {
      logError('An error occured removing comment by id', error, {
        newsId,
        commentId,
      });
      throw {
        code: errorCodes.COMMENT.DELETE_FAILED,
        msg: 'Can not delete comment',
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
    createNews,
    getNews,
    getNewsBySlug,
    getNewsById,
    updateNews,
    updatePublicNews,
    deleteNews,
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    disconnect,
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment,
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
