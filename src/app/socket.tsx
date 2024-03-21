import { io } from "socket.io-client";

export const socket = io("https://drawer-frontend.vercel.app/", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
