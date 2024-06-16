import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { loginUser } from "../../api/apiservice";
import { toast } from "sonner";
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { setUser } = ChatState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { email, password } = formData;

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    const res = await loginUser(email, password);
    if (res) {
      toast.success("Login Successfull");
      setUser(res);
      navigate("/chats");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center pt-20 justify-start w-full h-full rounded-3xl z-10 gap-2">
      <img src="/svgs/login.svg" alt="logo" className="w-[400px] h-[200px]" />
      <p className="text-3xl font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-[#a5e166] py-8">
        Please Login to your Account
      </p>
      <div className="w-full items-center justify-center flex flex-col gap-10">
        <div className="flex flex-col gap-5 w-full items-center">
          <div className="w-4/5">
            <input
              id="email"
              name="email"
              className="w-full px-3 py-2.5 border rounded focus:outline-none focus:ring focus:border-blue-500"
              type="email"
              placeholder="Enter Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-4/5">
            <div className="relative">
              <input
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
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
        </div>

        <button
          className="w-4/5 px-4 py-3 text-white bg-[#a5e166] rounded"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? "Logging ... ": "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
