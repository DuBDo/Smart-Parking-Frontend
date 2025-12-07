import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import io from "socket.io-client";

//creating socket context
const SocketContext = createContext(null);

//custom hook
export const useSocket = () => {
  return useContext(SocketContext);
};

//provider component
export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_URL), []);

  const [isConnected, setIsConnected] = useState(false);

  //connection and event
  useEffect(() => {
    //manually connect the socket
    socket.connect();
    //define standard event listeners
    socket.on("connect", () => {
      console.log("Socket connected successfully");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    //global error handler
    socket.on("connect_error", (err) => {
      console.error(`Socket connection error: ${err.message}`);
    });
    //cleanup: runs when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect");
    };
  }, [socket]);

  //context value
  const value = {
    socket,
    isConnected,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
