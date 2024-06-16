import React, { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Lottie from "lottie-react";
import animationData from "../animations/typinglogin.json";
const HomePage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [showSignup, setShowSignup] = React.useState(false);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  }, [location.pathname]);
  return (
    <div className="flex w-full h-screen z-[100] items-center justify-center p-4 overflow-hidden">
      <div className="grid grid-cols-4 w-full h-full  gap-10">
        <div className=" col-start-1 col-end-3  z-10 bg-opacity-0  h-full border rounded-2xl border-black relative">
          <div className="absolute bottom-0 left-0  w-[500px]">
            <Lottie animationData={animationData} play loop />
          </div>
        </div>
        <div className="col-start-3 col-end-5 z-20 flex flex-col  items-center justify-start gap-6">
          <div className="w-full">{!showSignup ? <Login /> : <Signup />}</div>
          <div className="w-4/5  flex justify-end text-[#EF6F6C] cursor-pointer text-sm gap-5">
            <p>
              {" "}
              {showSignup
                ? "Already have account ?"
                : "Don't have the account ? "}
            </p>
            <span onClick={() => setShowSignup(!showSignup)}>
              {showSignup ? "Login" : "Signup"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
