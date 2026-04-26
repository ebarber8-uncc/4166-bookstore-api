import express from 'express';

import{ getCartItemsHandler,
        addItemToCartHandler,
        updateCartItemHandler,
        removeCartItemHandler,
        getCartByIdHandler
} from '../controllers/cartController.js';

import { validateCartItemInput,validateIdInput } from '../middleware/inputFormatValidators.js';
import { authenticate } from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router();


router.get('/', authenticate, getCartItemsHandler);
router.post('/items', authenticate, validateCartItemInput, addItemToCartHandler);
router.patch('/items', authenticate, validateCartItemInput, updateCartItemHandler);
router.delete('/items/:bookId', authenticate,validateIdInput, removeCartItemHandler);
router.get('/user/:userId', authenticate,validateIdInput, authorizeRoles('ADMIN'), getCartByIdHandler);


export default router;
