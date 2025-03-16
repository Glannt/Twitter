import { Router } from 'express';
import { loginValidator } from '../middlewares/users.middlewares';
import { login } from '../controllers/users.controllers';
import { register } from '../controllers/users.controllers';
import { registerValidator } from '../middlewares/users.middlewares';
import validate from '../utils/validation';
const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.post('/login', loginValidator, login);
router.post('/register', validate(registerValidator), register);

export default router;
