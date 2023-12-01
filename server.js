import express from 'express';
import bodyParser from 'body-parser';

import './config/db.js';

//Routes
import authController from './routes/authRoute.js';

const port = 3000;

const app = express();

//middleware
app.use(bodyParser.json());

app.use('/api', authController);

app.listen(port, () => {
    console.log('listening on port ' + port);
});
