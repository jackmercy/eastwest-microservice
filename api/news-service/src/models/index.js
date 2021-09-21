const News = require('./news.model');
const Author = require('./author.model');
const Comment = require('./comment.model');
const Category = require('./category.model');
const CommunityMember = require('./communityMember.model');

module.exports = Object.create({
  News,
  Author,
  Comment,
  Category,
  CommunityMember,
});
