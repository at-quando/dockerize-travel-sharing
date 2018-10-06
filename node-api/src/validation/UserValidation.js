const { check, validationResult } = require('express-validator/check');

exports.validate = [
  check('name','name have at least 5 chars').trim(),
  check('password', 'passwords must be at least 5 chars').isLength({ min: 5 }),
  check('provider').isLength({ min: 1 }),
  check('uid').isEmail().withMessage('must be an email'),
  check('phone').isLength({ min: 9 }),
  check('gender','not empty').isLength({ min: 1 }),
  (req, res, next) => { 
    try {
      validationResult(req.body).throw();
      next();
    } catch (e) {
      console.log(e)
      res.status(422).json({ errors: e.mapped() });
    }
  }
]
