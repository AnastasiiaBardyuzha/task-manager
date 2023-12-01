import express from 'express';
import bodyParser from 'body-parser';

const port = 3000;

const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('listening on port ' + port);
});
