import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user, parkingLot } = useSelector((state) => state.user);
  const [isConnected, setIsConnected] = useState(false);

  const query = useMemo(() => {
    const q = {};
    if (user?._id) q.userId = user._id;
    if (user?.role === "owner" && parkingLot?._id) {
      q.ownerParkingLotId = parkingLot._id;
    }
    return q;
  }, [user?._id, user?.role, parkingLot?._id]);

  const socket = useMemo(() => {
    if (!user?._id) return null;

    return io(import.meta.env.VITE_BACKEND_URL, {
      query,
      auth: {
        token: localStorage.getItem("authToken"),
      },
      autoConnect: false,
    });
  }, [user?._id, query]);

  useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
