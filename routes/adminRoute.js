import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js'
import authorization from '../middleware/auth.js'

router.get('/', authorization, adminController.getAllAdmins);
router.get('/:id', authorization, adminController.getAdmin);
router.put('/:id', authorization, adminController.editAdmin);
router.delete('/:id', authorization, adminController.deleteAdmin);
router.post('/addAdmin', authorization, adminController.addAdmin)
router.post('/login', adminController.login)
router.post('/logout', adminController.logout)

export default router;