const { Router } = require('express');
const uploader = require('./uploader');

const register = (app) => {
  const router = Router();
  router.use('/api', [uploader]);
  app.use(router);

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message
    });
  });

  app.use((req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    res.status(error.status).json({
      message: error.message
    });
  });
};

module.exports = register;
