import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLoginPopup }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [from, setFrom] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelfrom = async (e) => {
    e.preventDefault();
    let newUrl = url;

    try {
      if (currState === "Login") {
        // Use POST for Login (secure)
        newUrl += "/api/user/login";
        const response = await axios.post(newUrl, {
          email: from.email,
          password: from.password,
        });

        if (response.status >= 200 && response.status <= 300) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          setShowLoginPopup(false);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Registration
        newUrl += "/api/user/register";
        const response = await axios.post(newUrl, from);

        if (response.status >= 200 && response.status <= 300) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          setShowLoginPopup(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 grid place-items-center">
      <form
        className="w-full max-w-[90vw] sm:max-w-[330px] bg-white flex flex-col gap-6 p-6 sm:p-8 rounded-lg text-sm animate-fade-in"
        onSubmit={handelfrom}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800">{currState}</h2>
          <img
            onClick={() => setShowLoginPopup(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" && (
            <input
              name="name"
              type="text"
              value={from.name}
              onChange={(e) => setFrom({ ...from, name: e.target.value })}
              placeholder="Your name"
              required
              className="outline-none border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-red-300"
            />
          )}
          <input
            type="email"
            name="email"
            value={from.email}
            onChange={(e) => setFrom({ ...from, email: e.target.value })}
            placeholder="Your Email"
            autoComplete="off"
            required
            className="outline-none border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-red-300"
          />
          <input
            type="password"
            name="password"
            value={from.password}
            onChange={(e) => setFrom({ ...from, password: e.target.value })}
            placeholder="Your Password"
            required
            className="outline-none border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-red-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600 transition"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2">
          <input type="checkbox" className="mt-[3px] cursor-pointer" />
          <p className="text-gray-500 text-xs">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
        {currState === "Sign Up" ? (
          <p className="text-gray-500 text-xs">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-red-500 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-500 text-xs">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-red-500 cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
