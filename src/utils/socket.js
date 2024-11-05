// utils/socketConnection.js

import { io } from "socket.io-client";
import { LAWYER_SOCKET_CONNECTION } from "@/constant/apiUrls";
import { getCookie } from "cookies-next";
import { USER_TOKEN } from "@/constant/cookiesKeys";

let socket;

export const getSocket = () => {
  if (!socket) {
    // Initialize the socket only if it hasn’t been initialized
    const token = getCookie(USER_TOKEN);
    socket = io(LAWYER_SOCKET_CONNECTION, {
      autoConnect: false,
      auth: { token },
    });
  }
  return socket;
};

// let orderSocket;

// export const getSocketOrder = () => {
//   if (!orderSocket) {
//     orderSocket = io(`${ARSHI_SOCKET_CONNECTION}/order`);

//     orderSocket.on("connect", () => {
//       console.log("Socket connected");
//     });

//     orderSocket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });
//   }
//   return orderSocket;
// };

// let subTotalSocket;

// export const getSocketSubTotal = () => {
//   if (!subTotalSocket?.connected) {
//     subTotalSocket = io(`${ARSHI_SOCKET_CONNECTION}`);

//     subTotalSocket.on("connect", () => {
//       console.log("Socket connected");
//     });

//     subTotalSocket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });
//   }
//   return subTotalSocket;
// };

// let subTotalSocketDetails;

// export const getSocketSubTotalDetails = () => {
//   if (!subTotalSocketDetails?.connected) {
//     subTotalSocketDetails = io(`${ARSHI_SOCKET_CONNECTION}`);

//     subTotalSocketDetails.on("connect", () => {
//       console.log("Socket connected");
//     });

//     subTotalSocketDetails.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });
//   }
//   return subTotalSocketDetails;
// };
