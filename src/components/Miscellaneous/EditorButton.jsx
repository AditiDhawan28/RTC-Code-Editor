import React from "react";
import { Button, Divider } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const EditorButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = React.useState("");
  const navigate = useNavigate();

  const roomHandler = () => {
    const roomID = uuid();

    if (roomID) {
      window.open(`http://localhost:5173/editor/${roomID}`);
    }
  };
  const joinExistingRoom = () => {
    if (groupChatName.trim() === "")
      return toast.error("Please enter a room id");
    if (groupChatName) {
      window.open(`http://localhost:5173/editor/${groupChatName}`);
    }
  };
  return (
    <div className="text-base">
      <Button
        borderColor={"black"}
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        Create Room
      </Button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Livvic"
            display="flex"
            justifyContent="center"
          >
            Create Editor
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Join Existing Room"
                mb={1}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <ModalFooter>
              <Button onClick={joinExistingRoom} bg={"#f25757"} color={"white"}>
                Enter Room
              </Button>
            </ModalFooter>
            <div className=" flex items-center justify-center gap-10">
              <Divider /> OR <Divider />
            </div>
            <Button
              onClick={roomHandler}
              bg={"#a5e166"}
              color={"white"}
              width={"100%"}
              marginTop={6}
              marginBottom={10}
            >
              Join New Room
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditorButton;
