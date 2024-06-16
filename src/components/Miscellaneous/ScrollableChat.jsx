import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender,isSameSenderMargin,isSameUser } from '../../config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'
import {AES,enc} from 'crypto-js';
const SECRET_KEY = "0mzt3amdht5cstbhmr7hmdktr@s";

const ScrollableChat = ({messages}) => {
    const {user}=ChatState();

    const decryptMessage = (ciphertext)=>{
      const bytes  = AES.decrypt(ciphertext,  SECRET_KEY);
      const originalText = bytes.toString(enc.Utf8);
      return originalText;
  }
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.dp}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#a5e166" : "#E2E1F4"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "10px 15px",
                maxWidth: "75%",
              }}
            >
              {decryptMessage(m.content)}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat