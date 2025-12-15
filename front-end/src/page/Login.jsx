import React, { useContext, useState } from "react";
import { handleError, handleSuccess } from "../component/notifiction";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../store/create";
import { login } from "../APi/Api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setIsLogin } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData)
      console.log(response.data)
     console.log("email",response.data.data)
      const { status } = response;
      const { message, token } = response.data;
      
      if (status === 200) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("userName", response.data.data.userName);
        localStorage.setItem("userID", response.data.data._id);
        setIsLogin(true);
        setTimeout(() => navigate("/"), 1000);
      } else {
        handleError(message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      handleError("Error submitting form");
    }
  };

  return (
    <>
      <div className="min-h-screen max-sm:min-h-[57vh]  flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 p-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6 transition-all hover:shadow-2xl">
          <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 text-sm mb-4">Please login to your account</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              required
            />

            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-md transition"
            >
              Log In
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-2">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
