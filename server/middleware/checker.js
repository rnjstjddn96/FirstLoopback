'use strict';
module.exports = function() {
  const app = require('../server');

  return (req, res, next) => {
    const User = app.models.user;
    if (req.accessToken) {
      User.findOne({where: {id: req.accessToken.userId}}, function(err, user) {
        if (user) {
         req['userInfo'] = user;

         return next();
       } else {
         return next(utils.e(401, 'no user'));
       }
      });
    } else {
      return next();
    }
  };
};
