import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateIdInput = [
    param('id')
        .exists({ checkFalsy: true })
        .withMessage('ID is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    handleValidationErrors
];

export const validateBookInput = [
    body('title')
        .exists({ checkFalsy: true })
        .withMessage('Title must be provided and not be blank')
        .bail()
        .isString()
        .withMessage('Title must be a string'),
    body('author')
        .optional()
        .isString()
        .withMessage('Author must be a string'),
    body('genre')
        .optional()
        .isString()
        .withMessage('Genre must be a string'),
    body('publisher')
        .optional()
        .isString()
        .withMessage('Publisher must be a string'),

    handleValidationErrors
];

export const validateCartItemInput = [
    body('bookId')
        .exists({ checkFalsy: true })
        .withMessage('bookId is required')
        .bail()
        .isInt()
        .withMessage('bookId must be an integer'),

    body('quantity')
        .exists({ checkFalsy: true })
        .withMessage('quantity is required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('quantity must be a positive integer'),

    handleValidationErrors
];