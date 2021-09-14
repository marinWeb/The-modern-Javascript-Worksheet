const { check } = require('express-validator');
const UserRepo = require('../../repositories/users');

module.exports = {
  requireTitle: check('title')
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage('Title length must be between 5 and 40'),
  requirePrice: check('price')
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage('Must be a number greater than 0'),
  requireEmail: check('email')
    .trim()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async (email) => {
      const existingUser = await UserRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4-20 characters'),
  requireConfirmPassword: check('confirmPassword')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4-20 characters')
    .custom((confirmPassword, { req }) => {
      console.log('checking custom');
      if (confirmPassword !== req.body.password) {
        throw new Error('Password must match');
      }
    }),
  requireUserEmail: check('email')
    .trim()
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async (email) => {
      // console.log('in requireUserEMail');
      const isExistingUser = await UserRepo.getOneBy({ email });
      if (!isExistingUser) {
        throw new Error('Email is incorrect');
      }
    }),
  requireUserPassword: check('password')
    .trim()
    .custom(async (password, { req }) => {
      // console.log('in requserPassword');
      const existingUser = await UserRepo.getOneBy({ email: req.body.email });
      if (!existingUser) {
        throw new Error('Password Incorrect');
      }

      const isPasswordValid = await UserRepo.comparePassword(
        existingUser.password,
        password
      );

      if (!isPasswordValid) {
        throw new Error('Password Incorrect');
      }
    }),
};
