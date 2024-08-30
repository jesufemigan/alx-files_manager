import { Router } from "express";
import AppController from "../controllers/AppController";
import UsersControllers from "../controllers/UsersController";

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersControllers.postNew);
router.get('/connect', )
router.get('/disconnect',)
router.get('/users/me',)

export default router;