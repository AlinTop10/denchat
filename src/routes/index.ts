import { Router } from "express";
import user from "./users.router";
import chat from "./chats.router";
import auth from "./auth.router";
import { verifyToken } from "../middleware/auth.middleware";


const router = Router();

router.get('/', (req, res) => {
    res.send('Hello word!');
  });

  router.use('/users', verifyToken, user);
  router.use('/chats', chat);
  router.use('/auth', auth);
  
  
   // app.get('/users',index)

   export default router;