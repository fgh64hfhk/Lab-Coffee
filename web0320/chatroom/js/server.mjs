import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const port = 8080;
httpServer.listen(port);
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5500/index.html",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
console.log("io:", io);