import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signupUser } from "../../api/apiservice";
import { ChatState } from "../../Context/ChatProvider";
const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { setUser } = ChatState();
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = userDetails;

  let navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email || !username || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const res = await signupUser(email, username, password);
    if (res) {
      toast.success("Yay! Welcome to CodeChat");
      navigate("/chats");
      setUser(res);
    }
  };
  const handleFormChange = (event) => {
    event.preventDefault();

    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center  pt-20  justify-start w-full h-full rounded-3xl z-10 gap-2  ">
      <img src="/svgs/login.svg" alt="logo" className="w-[400px] h-[200px]" />
      <p className="text-3xl  font-bold   z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-[#a5e166] py-8">
        Create your account now
      </p>
      <div className="w-full items-center justify-center flex flex-col gap-10">
        <form
          className="flex flex-col gap-5 w-full items-center "
          onSubmit={submitHandler}
        >
          <div className="w-4/5">
            <input
              name="email"
              className="w-full px-3 py-2.5 border rounded focus:outline-none focus:ring focus:border-blue-500"
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="w-4/5">
            <input
              name="username"
              className="w-full px-3 py-2.5 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Your Username"
              value={username}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="w-4/5">
            <div className="relative">
              <input
                name="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={handleFormChange}
                required
              />
              <button
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            className="w-4/5 px-4 py-3 text-white bg-[#a5e166] rounded "
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
