import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./style.css";
import { IconButton, Spinner, useToast, Button } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "lottie-react";
import animationData from "../../animations/typing.json";
import illustration from "../../animations/illustration.json";
import { AES } from "crypto-js";
import io from "socket.io-client";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { ChatState } from "../../Context/ChatProvider";
import { singleChat } from "../../api/apiservice";
import EditorButton from "./EditorButton";
const ENDPOINT = import.meta.env.VITE_BASE_URL;
const SECRET_KEY = "0mzt3amdht5cstbhmr7hmdktr@s";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          authToken: user.token,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${ENDPOINT}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      // console.log(data);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Some Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      const config = {
        headers: {
          "Content-type": "application/json",
          authToken: user.token,
        },
      };
      const ciphertext = AES.encrypt(newMessage, SECRET_KEY).toString();
      setNewMessage("");

      const data = await singleChat(user.token, {
        content: ciphertext,
        chatId: selectedChat,
      });
      if (data) {
        socket.emit("new message", data);
        setMessages([...messages, data]);
      }
    }
  };

  const sendMessageViaButton = async () => {
    socket.emit("stop typing", selectedChat._id);
    const ciphertext = AES.encrypt(newMessage, SECRET_KEY).toString();
    setNewMessage("");
    const data = await singleChat(user.token, {
      content: ciphertext,
      chatId: selectedChat?._id,
    });
    if (data) {
      socket.emit("new message", data);
      setMessages([...messages, data]);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (message) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== message.chat._id
      ) {
        if (!notification.includes(message)) {
          setNotification([message, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, message]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let timeouttime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - timeouttime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Livvic"
            fontWeight={700}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            zIndex={999}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat?.chatName?.toUpperCase()}
                  <div className="flex items-center justify-between gap-10">
                    <EditorButton />
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </div>
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            w="100%"
            h="100%"
            backdropBlur={"20px"}
            borderRadius="2xl"
            overflowY="hidden"
            zIndex={999}
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
              position={"relative"}
            >
              {istyping ? (
                <div className="absolute -top-10 left-0">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: "50px", marginBottom: 35, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={10}
                backdropBlur={"blur(10px)"}
                background={"transparent"}
              >
                <Input
                  variant="filled"
                  bg="white"
                  placeholder="Whispher Something"
                  value={newMessage}
                  shadow={"md"}
                  rounded={20}
                  background={"#E2E1F4"}
                  border={"1px"}
                  outline={"none"}
                  onChange={typingHandler}
                  p={7}
                />
                <Button
                  p={7}
                  border={"1px"}
                  background={"#E2E1F4"}
                  onClick={sendMessageViaButton}
                  rounded={20}
                  shadow={"md"}
                >
                  Hit Me
                </Button>
              </Box>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          d="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          zIndex={9}
          backdropBlur={"90px"}
        >
          <Lottie animationData={illustration} loop={true} autoplay={true} />
          <Text fontSize="4xl" pb={3} color={"var(--white)"} textAlign="center">
            Click on a chat to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
