import { Router } from "express";
import TransactionController from './transaction.controller.js'

const router = Router();

router.post('/', TransactionController.create);
router.post('/notification', TransactionController.handleNotification);

export default router;