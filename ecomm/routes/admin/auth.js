const express = require('express');

const UserRepo = require('../../repositories/users');
const signupTemplate = require('../../view/admin/auth/signup');
const signinTemplate = require('../../view/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requireConfirmPassword,
  requireUserEmail,
  requireUserPassword,
} = require('./validators');

const { handleErrors } = require('./middleware');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requireConfirmPassword],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    //register the user
    const user = await UserRepo.create({ email, password });

    //send a cookie in response
    req.session.userId = user.id;

    res.redirect('admin/products');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;

  res.send('YOU ARE LOGGED OUT!!!');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  '/signin',
  [requireUserEmail, requireUserPassword],
  handleErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await UserRepo.getOneBy({ email });
    req.session.userId = user.id;
    res.redirect('/admin/products');
  }
);

module.exports = router;
