import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={3}
      py={2}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      background={"#E2E1F4"}
      cursor="pointer"
      color={"black"}
      onClick={handleFunction}
    >
      {user.username}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;