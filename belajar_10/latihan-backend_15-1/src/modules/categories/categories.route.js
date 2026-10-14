import { Router } from "express";
import CategoryController from './category.controller.js'
import { verifyToken } from "../../middlewares/middlewares.js";

const router = Router();

router.use(verifyToken);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;