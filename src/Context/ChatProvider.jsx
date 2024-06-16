import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AES, enc } from "crypto-js";
const SECRET_KEY = "0mzt3amdht5cstbhmr7hmdktr@s";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [location.pathname]);

  // Encrypt
  const encrypt = (data) => {
    const ciphertext = AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return ciphertext;
  };

  // Decrypt
  const decrypt = (ciphertext) => {
    const bytes = AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
    return decryptedData;
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        encrypt,
        decrypt,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
