import { Avatar } from "@chakra-ui/avatar";
import Editor from "../components/Editor";

import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { toast } from "sonner";

import React from "react";
import { useSocket } from "../hooks/useSocket";
const EditorPage = () => {
  const { id } = useParams();
  toast.success(id);
  const navigate = useNavigate();
  const { socketConnection, roomState } = useSocket(id);
  const { roomMembers, editorCode } = roomState;
  const copyRoomId = () => {
    if (id) navigator.clipboard.writeText(id);
    toast.success("Room Id Copied");
  };
  const leaveRoom = () => {
    navigate("/");
  };

  return (
    <div className="m-4 flex gap-5 border min-h-[90vh] min-w-screen rounded-2xl shadow-xl overflow-hidden z-[9999]">
      <div className="min-w-[20%] max-w-[20%] flex flex-col gap-5 p-5 justify-between min-h-full">
        <div className="flex ">
          {roomMembers?.length ? (
            roomMembers.map((user) => (
              <span key={user._id} className="m-2">
                <Avatar children={"A"} src={`https://cataas.com/cat`} />
              </span>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="w-full ">
          <Button
            name="Copy Code "
            textColor={"text-white"}
            background="bg-primaryBlack"
            onClick={copyRoomId}
          />
          <Button
            name="Leave "
            textColor={"text-white"}
            background="bg-primaryBlack"
            onClick={leaveRoom}
          />
        </div>
      </div>
      <div className="border-l min-w-[80%]  max-w-[80%] overflow-hidden ">
        <Editor editorCode={editorCode} socketConnection={socketConnection} />{" "}
      </div>
    </div>
  );
};

export default EditorPage;
