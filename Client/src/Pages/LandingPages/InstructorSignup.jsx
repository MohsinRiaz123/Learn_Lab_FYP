import React,{ useRef } from "react";
import LandingNavbar from "../../Components/LandingNavbar";
import LandingFooter from "../../Components/LandingFooter";
import { IoIosArrowForward } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowRightLong } from "react-icons/fa6";
const InstructorSignup = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .required("First name is required"),

    lastName: Yup.string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .required("Last name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    document: Yup.mixed()
      .required("PDF file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        return value && value.type === "application/pdf";
      })
      .test("fileSize", "File size must be less than 5MB", (value) => {
        return value && value.size <= 5 * 1024 * 1024; // 5MB limit
      }),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const fileInputRef = useRef(null);
  return (
    <div>
      <LandingNavbar />
      <div>
        <div className="bg-[url(./src/assets/Images/aboutusBg.png)] pt-25 pb-15 pl-45">
          <div className="text-4xl font-bold">Instructor SignUp</div>
          <div className="font-semibold text-gray-400 flex space-x-2 items-center">
            <a href="/">Home</a> <IoIosArrowForward />{" "}
            <p className="text-purple">Sign Up</p>{" "}
          </div>
        </div>
        <div className="w-full space-y-6 my-auto">
          <div className=" mx-auto w-[40%]">
            <p className=" text-3xl font-bold">Create Your Account</p>
            <p className=" text-lg font-semibold text-gray-400">
              Hey there! Ready to join the LearnLab? We just need a few details
              from you to get started. Let's do this!
            </p>
          </div>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              document: null,
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form submitted:", values);
              resetForm();
            }}
          >
            {({ setFieldValue, isSubmitting, values }) => (
              <Form className="mx-auto w-[40%] mb-10">
                <div className="grid grid-cols-2 space-x-4 mb-10">
                  <div>
                    <label className="font-semibold">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-400"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-400"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="mb-10">
                  <label className="font-semibold">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* File Upload Button */}
                <div className="mb-10">
                  <label className="font-semibold">
                    Latest Tested Degree <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(event) =>
                      setFieldValue("document", event.currentTarget.files[0])
                    }
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full p-2 border border-gray-400 rounded-lg font-semibold text-gray-600 
                         hover:bg-purple hover:text-white transition"
                  >
                    Upload PDF
                  </button>

                  {/* Show Selected File Name */}
                  {values.document && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {values.document.name}
                    </p>
                  )}

                  <ErrorMessage
                    name="document"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-10">
                  <label className="font-semibold">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-10">
                  <label className="font-semibold">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-400"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full shadow-lg shadow-blue hover:shadow-none flex items-center justify-center 
                      rounded-full bg-yellow mt-10 w-fit py-3 font-semibold hover:bg-purple text-black 
                      hover:text-white transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                  <p className="ml-4">
                    <FaArrowRightLong />
                  </p>
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex justify-center mb-10 ">
          <p className="font-semibold text-gray-400 ">
            Already have an account?
          </p>
          <a
            href="/login"
            className="pl-1 underline text-purple hover:text-yellow"
          >
            login
          </a>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default InstructorSignup;
