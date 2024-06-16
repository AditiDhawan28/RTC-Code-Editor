import React from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({user, handleFunction}) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
    //   bg="#E8E8E8"
    bg="#D4F6CC"
      _hover={{
        background: "#3CCF4E",
        color: "white",
        transitionDelay:"0.3s ease-in-out"
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.dp}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Username : </b>
          {user.username}
        </Text>
      </Box>
    </Box>
  )
}

export default UserListItem