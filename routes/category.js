import express from 'express' ;
const router = express.Router();
import controller from '../controllers/category.js';

router.get('/', controller.getAllCategories);
router.post('/', controller.addCategory);
router.get('/:id', controller.getCategory);
router.put('/:id', controller.editCategory);
router.delete('/:id', controller.deleteCategory);

export default router;
