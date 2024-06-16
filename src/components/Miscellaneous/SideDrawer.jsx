import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
// import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
// import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api/apiservice";
import { ChakraProvider } from "@chakra-ui/react";

const SideDrawer = () => {
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!search) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          authToken: user.token,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setChatLoading(true);

      const data = await fetchData(userId, user.token);
      if (data) {
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setChatLoading(false);
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#E2E1F4"
        w="95%"
        borderColor={"black"}
        marginX={"auto"}
        shadow={"xl"}
        p="10px"
        marginTop={5}
        backdropBlur={"20px"}
        rounded={25}
        border={"2px"}
        zIndex={99}
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button bg={"transparent"} onClick={onOpen}  _hover={{ bg: "transparent" }}>
            <SearchIcon  fontSize={"2xl"}/>
          </Button>
        </Tooltip>
        <Text
          fontSize={"3xl"}
          fontFamily={".livvic-bold"}
        >
          Code Chat
        </Text>
        <Box zIndex={99}>
          <Menu>
            <MenuList pl={2}>
              {!notification.length && "No Notifications"}
              {notification.map((notify) => (
                <MenuItem
                  key={notify._id}
                  onClick={() => {
                    setSelectedChat(notify.chat);
                    setNotification(notification.filter((n) => n !== notify));
                  }}
                >
                  {notify.chat.isGroupChat
                    ? `New message in ${notify.chat.chatName}`
                    : `New Message from ${getSender(user, notify.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              shadow={"none"}
              _hover={{ bg: "transparent", border: 0, shadow: "none" }}
              boxShadow={"none"}
              rounded={9999}
            >
              <Avatar
                as={Button}
                size="xl"
                cursor="pointer"
                name={user.username}
                src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.username}`}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search here..."
                // mr={2}
                value={search}
                // onChange={(e) => setSearch(e.target.value)}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* <Button onClick={handleSearch}>Go</Button> */}
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {chatLoading && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default SideDrawer;
