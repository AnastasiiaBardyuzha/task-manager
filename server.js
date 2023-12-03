import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import './config/db.js';

//Routes
import authRouter from './routes/authRoute.js';
import taskRouter from './routes/taskRoute.js';

//swagger docs
import { swaggerSpec } from "./config/swagger.js";

const port = 3000;

const app = express();

//middleware
app.use(bodyParser.json());

//swagger doc link
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api', authRouter);
app.use('/api', taskRouter);

app.listen(port, () => {
    console.log('listening on port ' + port);
});
