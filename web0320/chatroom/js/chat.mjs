
// client-side
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8080", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});