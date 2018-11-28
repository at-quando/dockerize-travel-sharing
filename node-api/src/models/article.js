var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Article schema
var ArticleSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  user_id: {
    type: Number,
    ref: 'User'
  },
  created_at: { 
    type: Date, required: true, default: Date.now 
  }
});

var Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.createArticle = function (article, callback) {
  article.save(callback);
}