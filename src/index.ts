import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';

import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['sample key'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
