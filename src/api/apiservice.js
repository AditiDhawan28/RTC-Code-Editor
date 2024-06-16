import axios from "axios";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Set a base URL using an Axios interceptor
const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
   
});

export const loginUser = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/auth/login`,
      { email, password },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    toast.error(error?.data?.message || "Please check your credentials");
  }
};

export const signupUser = async (username, email, password) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/auth/createuser`,
      { username, email, password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    toast.error(error?.data?.message ?? "Please check your credentials");
  }
};

export const fetchChats = async (user) => {
  const config = {
    headers: {
      authToken: user.token,
    },
  };
  try {
    const { data } = await axios.get(`${BASE_URL}/api/chat`, config);
    return data;
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

export const createGroupChat = async (
  groupChatName,
  selectedUsers,
  authToken
) => {
  try {
    const requestData = {
      name: groupChatName,
      users: JSON.stringify(selectedUsers.map((u) => u._id)),
    };
    const config = {
      headers: {
        authToken: authToken,
      },
    };
    const { data } = await customFetch.post(
      `/api/chat/group`,
      requestData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response.data?.message || "Something went wrong");
  }
};

export const fetchData = async (userId, authToken) => {
  try {
    const response = await customFetch.post("/api/chat", { userId }, config);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Something went wrong!");
    throw error;
  }
};

export const singleChat = async (authToken, obj) => {
  try {
    const config = {
      headers: {
        authToken: authToken,
      },
    };
    const response = await customFetch.post("/api/message", { ...obj }, config);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Something went wrong!");
  }
};
