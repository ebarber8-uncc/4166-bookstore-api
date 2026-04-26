import express from 'express';
import { getAllBooksHandler, 
    getBookByIdHandler, 
    createNewBookHandler,
    updateBookHandler,
    deleteBookHandler } from '../controllers/bookController.js';



import { validateIdInput, validateBookInput } from '../middleware/inputFormatValidators.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();


router.post('/', authenticate, authorizeRoles('ADMIN'),validateBookInput, createNewBookHandler);
router.get('/', getAllBooksHandler);
router.get('/:id',validateIdInput, getBookByIdHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'),validateIdInput, validateBookInput, updateBookHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateIdInput, deleteBookHandler);





export default router;