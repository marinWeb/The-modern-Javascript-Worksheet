const { validationResult } = require('express-validator');

module.exports = {
  handleErrors(templateFunc, dataCB) {
    console.log('In Handle Errors');
    return async (req, res, next) => {
      console.log('in return method of handleErrors');
      console.log(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // console.log('errors in HandleErrors');
        let data = {};
        if (dataCB) {
          data = await dataCB(req);
          // console.log('what does data consist of !!!');
          // console.log(data.product.title, data.product.price);
        }
        return res.send(templateFunc({ errors, ...data }));
      }

      next();
    };
  },

  requireAuth(req, res, next) {
    // console.log('in requireAuth');
    if (!req.session.userId) {
      // console.log('user not logged in!!!');
      return res.redirect('/signin');
    }

    next();
  },
};
