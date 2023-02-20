import express from 'express';
const router = express.Router();
import controller from '../controllers/author.js';

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;
