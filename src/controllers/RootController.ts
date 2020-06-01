import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function checkAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(402).send('Not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
      <div>
          <h2>You are logged in</h2>
          <a href="/auth/logout">Logout</a>
      </div>
    `);
    } else {
      res.send(`
      <div>
          <h2>You are not logged in</h2>
          <a href="/auth/login">Login</a>
      </div>
    `);
    }
  }

  @get('/protected')
  @use(checkAuth)
  getProtectedRoute(req: Request, res: Response) {
    res.send('You are successfully logged in!');
  }
}
