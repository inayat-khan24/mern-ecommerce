import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../component/notifiction.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    conformPassword: "",
    fcmId: "",
    countryName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.conformPassword) {
      handleError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:30045/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.status === 200) {
        handleSuccess(result.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(result.message || "Error signing up");
      }
    } catch (error) {
      handleError("Error submitting form");
      console.error(error.message);
    }

    setFormData({
      userName: "",
      email: "",
      password: "",
      conformPassword: "",
      fcmId: "",
      countryName: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-lg transition hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-2">
          Create Account
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "userName", placeholder: "User Name" },
            { name: "email", placeholder: "Email" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "conformPassword", placeholder: "Confirm Password", type: "password" },
            { name: "fcmId", placeholder: "FCM ID" },
            { name: "countryName", placeholder: "Country Name" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              required
            />
          ))}

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 hover:shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Log in
          </a>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
