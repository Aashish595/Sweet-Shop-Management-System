import express from 'express';
import { createSweet, getAllSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } from '../controller/sweet.controller.js';
import {authenticate , authorizeAdmin} from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticate);

router.post('/', authorizeAdmin, createSweet);

router.get('/', getAllSweets);

router.get('/search', searchSweets);

router.put('/:id', authorizeAdmin, updateSweet);

router.delete('/:id', authorizeAdmin, deleteSweet);

router.post('/:id/purchase', purchaseSweet);

router.post('/:id/restock', authorizeAdmin, restockSweet);

export default router;