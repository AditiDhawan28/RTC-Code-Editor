import { Box } from "@chakra-ui/layout";
// import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../../Context/ChatProvider";

const ChatArea = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      background="linear-gradient(35deg, rgba(248,243,242,0.7) 2%, rgba(248,243,242,1) 80%)"
      backdropBlur={"20px"}
      w={{ base: "100%" }}
      borderRadius="2xl"
      border={"1px"}
      borderColor={"black"}
      zIndex={10}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatArea;