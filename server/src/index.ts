import axios from 'axios';
import express from 'express';
import { getShipmentRoutes } from './routes/shipments';
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.API_PORT || 3001;

app.use('/api', getShipmentRoutes())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
