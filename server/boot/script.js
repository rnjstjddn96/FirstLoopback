const logger = require('../../server/logger').logger;
module.exports = function(app) {
  const User = app.models.User;
  return User.findOne({
    where: {
      email: 'master@master.com'
    }
  })
  .then(result => {
    if (result) {
        console.log('result: ', result);
      return;
    }
    return User.create({
      email: 'master@master.com',
      emailVerified: true,
      password: 'MBWHWfszxW73Ai2',
      userName: 'master',
      created: Date(),
      counter: 0
    });
  })
  .catch(error => {
    console.log('error: ', error);
    logger.error('start server init error %s', error);
  });
};
