import { Router } from "express";
import multer from 'multer';
import multerConfig from './config/Multer';

// ######################   Controllers   ######################

import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetappController from './app/controllers/MeetappController';

// ######################   Controllers   ######################

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(multerConfig);

//Cadastro e criação de sessão 

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

//*************************

//Middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);


routes.post('/files', uploads.single('file'), FileController.store);

routes.post('/meetapp', MeetappController.store);




export default routes;