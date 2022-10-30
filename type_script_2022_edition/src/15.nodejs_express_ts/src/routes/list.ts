import { Router } from 'express';

import { createItem, deleteItem, getItem, updateItem } from "../controllers/list";

const router = Router();

router.post('/', createItem);

router.get('/', getItem);

router.patch('/:id', updateItem);

router.delete('/:id', deleteItem);

export default router;