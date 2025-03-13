import { Router } from 'express';
import { account, login, register } from '../controllers/auth.controller';
import {verifyToken} from '../middleware/auth.middleware';
import { regValidator } from '../middleware/reg.middleware';
const auth = Router();

auth.post('/login', login);
auth.post('/reg', regValidator, register);
auth.get('/account', verifyToken, account);

export default auth;
