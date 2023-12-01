import express from 'express';
import bodyParser from 'body-parser';

import './config/db.js';

//Routes
import authRouter from './routes/authRoute.js';
import taskRouter from './routes/taskRoute.js';

const port = 3000;

const app = express();

//middleware
app.use(bodyParser.json());

app.use('/api', authRouter);
app.use('/api', taskRouter);

app.listen(port, () => {
    console.log('listening on port ' + port);
});
