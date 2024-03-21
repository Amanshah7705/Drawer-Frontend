import { io } from "socket.io-client";

export const socket = io("https://drawapp-backend.onrender.com", {
  withCredentials: true,
});
