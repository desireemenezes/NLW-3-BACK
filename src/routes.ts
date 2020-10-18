
import { Router } from 'express';
import multer from 'multer';

import OngsController from './controller/OngsController'
import uploadConfig from './config/uploads'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/ongs', OngsController.index);
routes.get('/ongs/:id', OngsController.show);
routes.post('/ongs', upload.array('images'), OngsController.create);

export default routes;