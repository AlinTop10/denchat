import express from 'express';
import { instance } from "./database";
import router from './routes';
import cors from 'cors';


const app = express();
const port = 4000;
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

