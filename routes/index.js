import { Router } from "express";
import AppController from "../controllers/AppController";
import UsersControllers from "../controllers/UsersController";
import AuthControllers from "../controllers/AuthController";
import FilesController from "../controllers/FilesController";

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersControllers.postNew);
router.get('/connect', AuthControllers.getConnect);
router.get('/disconnect', AuthControllers.getDisconnect);
router.get('/users/me', UsersControllers.getUser);
router.post('/files', FilesController.postUpload);

export default router;