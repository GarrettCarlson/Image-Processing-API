import express from 'express';
import resizer from '../utils/resizer';

const routes = express.Router();
routes.use(express.static('api'));

routes.get('/images', resizer, (req, res) => {
  console.log('Main api route was used');
});

export default routes;
