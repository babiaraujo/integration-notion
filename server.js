import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import contactRouter from './contact.js';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/contact', contactRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;