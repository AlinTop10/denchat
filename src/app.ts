import 'dotenv/config'
import express from 'express';
import { instance } from "./database";
import router from './routes';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";
import { log } from 'console';

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

const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:5173", // Permite conexiunea de pe frontend
    methods: ["GET", "POST"]
  }
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinPrivateChat", ({ userId, chatId }) => {
    const roomId = [userId, chatId].sort().join('_');
    socket.join(roomId);
    socket['roomId'] = roomId; // опційно для зручності
    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on("privateMessage", ({ userId, chatId, message }) => {
    const roomId = [userId, chatId].sort().join('_');
    io.to(roomId).emit("privateMessage", { chatId, message, userId });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use('/', router);

httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

