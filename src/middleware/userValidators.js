import { handleValidationErrors } from './handleValidationErrors.js';
import { body } from 'express-validator';

export const validateSignUp = [
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters',
    ),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];

export const validateLogIn = [
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),

  handleValidationErrors,
];

export const validateUpdateUser = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Must be a valid email')
    .normalizeEmail()
    .trim(),

  body('password')
    .optional()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be between 8 and 64 characters'),
  handleValidationErrors
];

export const validateUpdateRole = [
  body('role')
    .exists({ values: 'falsy' })
    .withMessage('Bad Request: Role is missing or invalid')
    .bail()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Bad Request: Role is missing or invalid'),
  handleValidationErrors
];