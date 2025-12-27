import React from "react";
import LandingNavbar from "../../Components/LandingNavbar";
import { IoIosArrowForward } from "react-icons/io";
import LandingFooter from "../../Components/LandingFooter";
import { SlLocationPin } from "react-icons/sl";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowRightLong } from "react-icons/fa6";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  msg: Yup.string().required("Message is required"),
});

const ContactUs = () => {
  return (
    <div className="space-y-2">
      <LandingNavbar />
      <div>
        <div className="bg-[url(./src/assets/Images/aboutusBg.png)] pt-25 pb-15 pl-45">
          <div className="text-4xl font-bold">Contact With Us</div>
          <div className="font-semibold text-gray-400 flex space-x-2 items-center">
            <a href="/">Home</a> <IoIosArrowForward />{" "}
            <p className="text-purple">Contact Us</p>{" "}
          </div>
        </div>
        <div className="flex  w-[80%] mx-auto space-x-6 mb-20">
          <div className="flex flex-col w-[40%] space-y-20">
            <div className=" flex items-center space-x-4 ">
              <div>
                <div className="text-white text-3xl bg-purple rounded-full p-6">
                  <SlLocationPin />
                </div>
              </div>
              <div className="font-semibold">
                <p className="text-xl">Address</p>
                <p className="text-gray-400">Lahore, Pakistan</p>
              </div>
            </div>
            <div className=" flex items-center space-x-4">
              <div>
                <div className="text-white text-3xl bg-purple rounded-full p-6">
                  <LuPhoneCall />
                </div>
              </div>
              <div className="font-semibold">
                <p className="text-xl">Phone</p>
                <p className="text-gray-400">+92 300 1672003</p>
                <p className="text-gray-400">+92 321 9464566</p>
              </div>
            </div>
            <div className=" flex items-center space-x-4">
              <div>
                <div className="text-white text-3xl bg-purple rounded-full p-6">
                  <HiOutlineMail />
                </div>
              </div>
              <div className="font-semibold flex flex-col">
                <p className="text-xl">E-mail Address</p>
                <a href="mailto:info@gmail.com" className="text-gray-400 hover:text-purple">info@gmail.com</a>
                <a href="mailto:info@gmail.com" className="text-gray-400 hover:text-purple">info@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="w-full space-y-6 my-auto">
            <div className=" mx-auto w-[80%]">
              <p className=" text-3xl font-bold">
                Send Us Message
              </p>
              <p className=" text-lg font-semibold text-gray-400">
                Stay connected with us! Reach out anytime. We're here to help you.
              </p>
            </div>

            <Formik
              initialValues={{ name: "", email: "", msg: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log("Form submitted:", values);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className=" mx-auto w-[80%] ">
                  <div className="mb-4">
                    <Field
                      as="textarea"
                      name="msg"
                      placeholder="Comment *"
                      className="w-full p-2 border border-gray-400 rounded-lg font-semibold placeholder-gray-400 "
                    />
                    <ErrorMessage
                      name="msg"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 space-x-6">
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name *"
                        className="w-full p-2 border border-gray-400 rounded-lg font-semibold placeholder-gray-400 "
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <Field
                        type="email"
                        name="email"
                        placeholder="E-mail *"
                        className="w-full p-2 border border-gray-400 rounded-lg font-semibold placeholder-gray-400 "
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shadow-lg shadow-blue hover:shadow-none flex items-center rounded-full bg-purple   mt-10 w-fit px-4 py-2 font-semibold text-white hover:bg-yellow hover:text-black transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-100 "
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                    <p className="ml-4">
                      <FaArrowRightLong />
                    </p>
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default ContactUs;
