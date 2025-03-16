import express, { Request, Response, NextFunction } from 'express';
import usersRouter from './routes/users.routes';
import databaseService from './services/database.services';
const app = express();
const router = express.Router();
const port = 3000;
app.use(express.json());
databaseService.connect();

router.use('/', (req, res, next) => {
  console.log('Time to request:', Date.now());
  next();
});
router.get('/tweets', (req, res) => {
  res.json({ data: [{ id: 1, message: 'Hello World' }] });
});

app.use('/api', router);

app.use('/users', usersRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(404).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
