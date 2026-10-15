import { Router } from "express";
import TransactionController from './transaction.controller.js'

const router = Router();

router.get('/', TransactionController.getAll);
router.get('/:id', TransactionController.getById);
router.post('/', TransactionController.create);
router.post('/notification', TransactionController.handleNotification);

export default router;