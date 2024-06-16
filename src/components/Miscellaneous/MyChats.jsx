import { AddIcon, ChatIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";

import { useEffect, useState } from "react";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "../ChatLoading";
import GroupChatModal from "./GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";
import { AES, enc } from "crypto-js";

import { fetchChats } from "../../api/apiservice";
const SECRET_KEY = "0mzt3amdht5cstbhmr7hmdktr@s";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchMessages = async () => {
    const res = await fetchChats(user);
    if (res) {
      setChats(res);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchMessages();
  }, [fetchAgain]);

  const decryptMessage = (ciphertext) => {
    const bytes = AES.decrypt(ciphertext, SECRET_KEY);
    const originalText = bytes.toString(enc.Utf8);
    return originalText;
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      gap={10}
      p={5}
      bg="linear-gradient(345deg, rgba(248,243,242,1) 16%, rgba(248,243,242,0.33519345238095233) 75%)"
      w={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      zIndex={9}
      rounded={20}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "20px" }}
            background={"#EFDBD1"}
            shadow={"md"}
            rounded={20}
            px={"50px"}
            py={"30px"}
            
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="var(--white)"
        w="100%"
        h="100%"
        borderRadius="lg"
        roundedTop={30}
        overflowY="hidden"
        

      >
        {chats ? (
          <Stack overflowY="scroll"  css={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
      
          }}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#a5e166" : "#E2E1F4"}
                border={selectedChat === chat ? "1px" : ""}
                borderColor={"black"}
                shadow={selectedChat === chat ? "md" : ""}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                display="flex"
                borderRadius="xl"
                key={chat._id}
              >
                <Avatar
                  mr={2}
                  size="sm"
                  cursor="pointer"
                  name={
                    !chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName
                  }
                  src={
                    !chat?.isGroupChat
                      ? chat?.latestMessage?.sender?.dp
                      : chat?.chatName
                  }
                />
                <Box display="flex" flexDirection="column">
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {/* {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>
                        {chat.latestMessage.sender._id === user._id
                          ? "You"
                          : chat.latestMessage.sender.name}{" "}
                        :{" "}
                      </b>
                      {decryptMessage(chat.latestMessage.content).length > 50
                        ? decryptMessage(chat.latestMessage.content).substring(
                            0,
                            51
                          ) + "..."
                        : decryptMessage(chat.latestMessage.content)}
                    </Text>
                  )} */}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
