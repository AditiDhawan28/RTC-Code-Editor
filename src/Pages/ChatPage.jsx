import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, ChakraProvider } from "@chakra-ui/react";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import MyChats from "../components/Miscellaneous/MyChats";
import ChatArea from "../components/Miscellaneous/ChatArea";
import Lottie from "lottie-react";
import chatbg from "../animations/chatbg.json";
const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className=" border-2 border-white z-10 h-screen w-screen ">
      {user ? (
        <div className="flex flex-col gap-5 overflow-hidden">
          <SideDrawer />
          <Box
            className="flex w-screen gap-10 justify-between   overflow-hidden"
            height={"85vh"}
            bg={"transparent"}
            marginX={50}
            overflow={"hidden"}

          >
            <Lottie animationData={chatbg} autoPlay loop style={{
              position:"absolute",
              top:0,
            }}/>
            <ChakraProvider>
              <MyChats fetchAgain={fetchAgain} />
              <ChatArea fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </ChakraProvider>
          </Box>
        </div>
      ) : null}
    </div>
  );
};

export default ChatPage;
