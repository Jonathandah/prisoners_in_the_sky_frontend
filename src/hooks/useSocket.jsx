import React, { useContext, createContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef()


    const socket = socketRef.current
    console.log("🚀 ~ file: useSocket.jsx ~ line 11 ~ SocketProvider ~ socket", socket)

    // socket.on('connect', () => {
    //   console.log('We got a signal!');
    // });

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const { socket } = useContext(SocketContext);

  return { socket: socket };
};
