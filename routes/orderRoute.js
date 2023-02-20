import express from 'express';
const router = express.Router();
import orderController from '../controllers/orderController.js'

router.post('/', orderController.sendOrder);
router.put('/:id', orderController.updateOrder);
router.get('/:id', orderController.getOrder);
router.get('/', orderController.getAllOrder);

export default router;