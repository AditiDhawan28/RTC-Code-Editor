import { useEffect, useState } from "react";
import { toast } from "sonner";
import io from "socket.io-client";
const SocketActionType = {
  FAILED: "FAILED",
  JOIN: "JOIN",
  SOMEONE_JOINED: "SOMEONE_JOINED",
  DISCONNECTED: "DISCONNECTED"
};

export const useSocket = (roomCode) => {
  const [socketConnection, setSocketConnection] = useState(null);
  const [currentUser, setCurrentUser] = useState({ /* define your initial user state */ });
  const [roomState, setRoomState] = useState({
    roomMembers: [],
    editorCode: "",
    roomCode: ""
  });

  useEffect(() => {
    const socket = io(); // Initialize the socket connection
    setSocketConnection(socket);
    console.log("Socket connection established");

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.on(SocketActionType.FAILED, (err) => {
        toast.error(err);
      });
      console.log('Socket effect is running');
      socketConnection.emit(SocketActionType.JOIN, { roomCode, user: { ...currentUser } });

      socketConnection.on(SocketActionType.SOMEONE_JOINED, (data) => {
        const { user } = data;
        if (user._id !== currentUser._id) {
          console.log(user);
          toast.success(`${user.username} has joined the Room`);
        }

        setRoomState({
          roomMembers: data?.clients,
          editorCode: data?.currentEditorCode,
          roomCode: data.roomCode
        });
      });

      socketConnection.on(SocketActionType.DISCONNECTED, (data) => {
        const { clients, socket, user, editorCode } = data;
        const updatedUserList = clients.filter((item) => item.socketid !== socket);
        console.log(updatedUserList);
        toast.error(`${user.username} has left the room.`);

        setRoomState({
          roomMembers: updatedUserList,
          editorCode,
          roomCode
        });
      });
    }
  }, [socketConnection, currentUser]);

  return {socketConnection, currentUser, roomState, setCurrentUser};
};
