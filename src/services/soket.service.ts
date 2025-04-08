import { Server } from "socket.io";

export function initSoket (httpServer){
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
      
      const makeRoomId = (chatId: number) => "room-" + chatId;
      
      io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
      
      
      
        socket.on("joinPrivateChat", ({ userId, chatId }) => {
          socket.join(makeRoomId(chatId));
          socket['roomId'] = makeRoomId(chatId); // опційно для зручності
          console.log(`User ${userId} joined room ${makeRoomId(chatId)}`);
        });
      
        socket.on("privateMessage", ({ userId, chatId, message }) => {
          io.to(makeRoomId(chatId)).emit("privateMessage", { chatId, message, userId });
        });
      
        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });
      });
}

