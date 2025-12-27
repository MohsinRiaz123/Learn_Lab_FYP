import React from "react";
import LandingNavbar from "../../Components/LandingNavbar";
import LandingFooter from "../../Components/LandingFooter";
import { IoIosArrowForward } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const users = [
    { email: "student@gmail.com", password: "Student123", role: "student" },
    {
      email: "instructor@gmail.com",
      password: "Instructor123",
      role: "instructor",
    },
    {
      email: "expert@gmail.com",
      password: "Expert123",
      role: "industryExpert",
    },
    { email: "admin@gmail.com", password: "Admin123", role: "admin" },
  ];
  const handleLogin = (values) => {
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      // Navigate based on role
      switch (user.role) {
        case "student":
          navigate("/payment");
          break;
        case "instructor":
          navigate("/instructor");
          break;
        case "industryExpert":
          navigate("/industoryExpert");
          break;
        case "admin":
          navigate("/Admin");
          break;
        default:
          break;
      }
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div>
      <LandingNavbar />
      <div>
        <div className="bg-[url(./src/assets/Images/aboutusBg.png)] pt-25 pb-15 pl-45">
          <div className="text-4xl font-bold">Login</div>
          <div className="font-semibold text-gray-400 flex space-x-2 items-center">
            <a href="/">Home</a> <IoIosArrowForward />{" "}
            <p className="text-purple">Login</p>{" "}
          </div>
        </div>
        <div className="w-full space-y-6 my-auto">
          <div className=" mx-auto w-[40%]">
            <p className=" text-3xl font-bold">Welcome back!</p>
            <p className=" text-lg font-semibold text-gray-400">
              Hey there! Ready to log in? Just enter your email and password
              below and you'll be back in action in no time. Let's go!
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleLogin(values);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className=" mx-auto w-[40%] mb-14 ">
                <div className="mb-14">
                  <label className="font-semibold ">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail "
                    className="w-full p-2 border border-gray-300 rounded-lg  placeholder-gray-400 "
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-14">
                  <label className="font-semibold ">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-lg  placeholder-gray-400 "
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex item-center justify-end">
                  <a href="/forgotPassword" className="text-purple underline">
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className=" w-full shadow-lg shadow-blue hover:shadow-none flex items-center justify-center rounded-full bg-yellow   mt-10 w-fit py-3 font-semibold  hover:bg-purple text-black hover:text-white  transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 "
                >
                  {isSubmitting ? "Submitting..." : "Sign In"}
                  <p className="ml-4">
                    <FaArrowRightLong />
                  </p>
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex justify-center mb-10 ">
          <p className="font-semibold text-gray-400 ">Don't have an account?</p>
          <a
            href="/studentSignup"
            className="pl-1 underline text-purple hover:text-yellow"
          >
            Sign Up
          </a>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default LoginPage;
