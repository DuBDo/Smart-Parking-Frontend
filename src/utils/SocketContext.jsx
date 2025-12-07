import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

//creating socket context
const SocketContext = createContext(null);

//custom hook
export const useSocket = () => {
  return useContext(SocketContext);
};

//provider component
export const SocketProvider = ({ children }) => {
  const { user, parkingLot } = useSelector((state) => state.user);
  const query = {};

  if (user && user.id) {
    query.userId = user.id;
  }
  if (user?.role === "owner" && parkingLot && parkingLot.id) {
    query.ownerParkingLotId = parkingLot.id;
  }
  const socket = useMemo(() => {
    if (!user || !user.id) {
      return null;
    }
    return io(import.meta.env.VITE_BACKEND_URL, {
      query,
      auth: {
        token: localStorage.getItem("authToken"), // Always good to pass a token if available
      },
      autoConnect: true,
    });
  }, [user, query, user?.id]);

  const [isConnected, setIsConnected] = useState(false);

  //connection and event
  useEffect(() => {
    //manually connect the socket
    if (!socket) return;

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
