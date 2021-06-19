import socketio from "socket.io-client";
import React from "react"
import dotenv from "dotenv";

dotenv.config();


export const socket = socketio(process.env.REACT_APP_SERVER_PROD,{ transports: ["websocket"] });
export const SocketContext = React.createContext();