import express from 'express';

import {createOrderHandler,
        getCurrentUsersOrdersHandler,
        getOrderByIdHandler,
        updateOrderHandler,
        deleteOrderHandler
} from '../controllers/orderController.js';

import { validateIdInput, validateCartItemInput } from '../middleware/inputFormatValidators.js';
import { authenticate } from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';
import {  authorizeOrderOwnership  } from '../middleware/authorizeOwnership.js';

const router = express.Router();


router.get('/', authenticate, getCurrentUsersOrdersHandler);
router.get('/:id', authenticate, authorizeRoles('ADMIN'),validateIdInput, getOrderByIdHandler);
router.post('/', authenticate, createOrderHandler);
router.patch('/:id', authenticate, validateIdInput, validateCartItemInput, authorizeRoles('ADMIN'), updateOrderHandler);
router.delete('/:id', authenticate, validateIdInput, authorizeRoles('ADMIN'), deleteOrderHandler);

export default router;