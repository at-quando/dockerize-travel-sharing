const express = require('express');
const auth = require('./auth');
const index = require('./index');
const places = require('./places');
const locations = require('./locations');
const posts = require('./posts');
const users = require('./users');
const sessions = require('./sessions');
const pictures = require('./pictures');
const comments = require('./comments');
const images = require('./images');
const articles = require('./articles');
const relationship = require('./relationship');

const router = express.Router();


/** GET / - Check service health */
router.get('/api', (req, res) =>
  res.send('OK')
);

router.use('/pictures', pictures);
router.use('/places', places);
router.use('/locations', locations);
router.use('/posts', posts);
router.use('/users', users);
router.use('/sessions', sessions);
router.use('/auth', auth);
router.use('/comments', comments);
router.use('/images', images);
router.use('/relationship', relationship);
router.use('/articles', articles);

module.exports = router;
