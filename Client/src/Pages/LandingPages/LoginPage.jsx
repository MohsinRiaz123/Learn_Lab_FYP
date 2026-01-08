import React from "react";
import LandingNavbar from "../../Components/LandingNavbar";
import LandingFooter from "../../Components/LandingFooter";
import { IoIosArrowForward } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  /* ---------------- LOGIN HANDLER ---------------- */
  const handleLogin = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.message ||
            "Login failed. Please check your credentials.",
          { position: "top-right" }
        );
        return;
      }

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login successful!", { position: "top-right" });

      // Navigate based on role
      setTimeout(() => {
        switch (data.role) {
          case "student":
            navigate("/student");
            break;
          case "instructor":
            navigate("/instructor");
            break;
          case "industryExpert":
            navigate("/industryExpert");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/");
        }
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <LandingNavbar />

      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <div className="bg-[url(./src/assets/Images/aboutusBg.png)] pt-25 pb-15 pl-45">
        <div className="text-4xl font-bold">Login</div>
        <div className="font-semibold text-gray-400 flex space-x-2 items-center">
          <a href="/">Home</a>
          <IoIosArrowForward />
          <p className="text-purple">Login</p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full space-y-6 my-auto">
        <div className="mx-auto w-[40%]">
          <p className="text-3xl font-bold">Welcome back!</p>
          <p className="text-lg font-semibold text-gray-400">
            Enter your email and password to continue.
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await handleLogin(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mx-auto w-[40%] mb-14">
              {/* Email */}
              <div className="mb-10">
                <label className="font-semibold">
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div className="mb-10">
                <label className="font-semibold">
                  Password <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end">
                <a
                  href="/forgotPassword"
                  className="text-purple underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-10 py-3 rounded-full font-semibold flex items-center justify-center bg-yellow hover:bg-purple hover:text-white transition ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "Please wait..." : "Sign In"}
                <span className="ml-3">
                  <FaArrowRightLong />
                </span>
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Footer */}
      <div className="flex justify-center mb-10">
        <p className="font-semibold text-gray-400">
          Don't have an account?
        </p>
        <a
          href="/studentSignup"
          className="pl-1 underline text-purple hover:text-yellow"
        >
          Sign Up
        </a>
      </div>

      <LandingFooter />
    </div>
  );
};

export default LoginPage;
