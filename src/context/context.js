import socketio from "socket.io-client";
import React from "react"


export const socket = socketio('http://localhost:5000',{ transports: ["websocket"] });
export const SocketContext = React.createContext();