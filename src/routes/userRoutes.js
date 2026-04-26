
import express from 'express';

import { getAllUsersHandler, 
    getUserByIdHandler, 
    updateUserHandler, 
    deleteUserHandler, 
    updateUserRoleHandler } from '../controllers/userController.js';

import { validateUpdateUser, validateUpdateRole } from '../middleware/userValidators.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';
import { validateIdInput } from '../middleware/inputFormatValidators.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';
import { authenticate } from '../middleware/authenticate.js';


const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/:id', authenticate, authorizeRoles('ADMIN'),validateIdInput, getUserByIdHandler);
router.put('/:id', authenticate, validateIdInput, authorizeOwnership, validateUpdateUser, updateUserHandler);
router.delete('/:id', authenticate, validateIdInput, authorizeOwnership, deleteUserHandler);
router.patch('/:id/role', authenticate, validateIdInput, authorizeRoles('ADMIN'), validateUpdateRole, updateUserRoleHandler);

export default router;
