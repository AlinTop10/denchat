import 'dotenv/config'
import express from 'express';
import router from './routes';
import cors from 'cors';
import { createServer } from "http";
import { initSoket } from './services/soket.service';

const app = express();
const port = 4000;
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",  // Permite explicit frontend-ul
  methods: ["GET", "POST"],         // Permite metodele necesare
  credentials: true                  // Activează credențialele dacă folosești autentificare
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createServer(app);

initSoket(httpServer);

app.use('/', router);

httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

