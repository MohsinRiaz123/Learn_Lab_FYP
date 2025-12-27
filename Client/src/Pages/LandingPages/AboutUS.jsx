import React from "react";
import LandingNavbar from "../../Components/LandingNavbar";
import LandingFooter from "../../Components/LandingFooter";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
const AboutUS = () => {
  const journey = [
    {
      img: "./src/assets/Images/experts.svg",
      title: "Learn with Experts ",
    },
    {
      img: "./src/assets/Images/learn.svg",
      title: "Learn Anything",
    },
    {
      img: "./src/assets/Images/certificates.svg",
      title: "Get Online Certificate",
    },
  ];
  const reviews = [
    {
      img: "./src/assets/Images/zoya.png",
      name: "Maham Noor",
      review:
        " Highly praised for its all-in-one capabilities, but some find it expensive for beginners.",
    },
    {
      img: "./src/assets/Images/haider.png",
      name: "haider Ali",
      review:
        "Users appreciate its ease of use and customization options but note limited built-in marketing tools.",
    },
    {
      img: "./src/assets/Images/zoya.png",
      name: "Zoya Khan",
      review:
        "Users like the straightforward design and affordability, but some wish for more advanced features.",
    },
    {
      img: "./src/assets/Images/haider.png",
      name: "haider Ali",
      review:
        "Users appreciate its ease of use and customization options but note limited built-in marketing tools.",
    },
    {
        img: "./src/assets/Images/zoya.png",
        name: "Zoya Khan",
        review:
          "Users like the straightforward design and affordability, but some wish for more advanced features.",
      },
      {
        img: "./src/assets/Images/haider.png",
        name: "haider Ali",
        review:
          "Users appreciate its ease of use and customization options but note limited built-in marketing tools.",
      },
  ];
  return (
    <div className="space-y-2">
      <LandingNavbar />
      <div>
        <div className="bg-[url(./src/assets/Images/aboutusBg.png)] pt-25 pb-15 pl-45">
          <div className="text-4xl font-bold">Who We Are</div>
          <div className="font-semibold text-gray-400 flex space-x-2 items-center">
            <a href="/">Home</a> <IoIosArrowForward />{" "}
            <p className="text-purple">About</p>{" "}
          </div>
        </div>
        <div className="flex justify-center  ">
          <div className=" flex w-1/2 items-center justify-center ">
            <img
              src="./src/assets/Images/aboutUs.png"
              alt="image"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center   p-24 font-semibold  w-1/2">
            <p className="text-purple ml-5">Get More About Us</p>
            <p className="text-2xl 2xl:text-5xl py-2">
              Empowering Students to reach their
              <span className=" text-4xl mx-2 font-bold text-white bg-yellow rounded-bl-4xl rounded-tr-4xl px-3 py-1 ">
                potential
              </span>
              <span>Goal For Next Level Challenge.</span>
            </p>

            <p className="text-gray-400  text-lg mt-5 ">
              Access thousands of high-quality courses in one platform.
              <br /> Learn new skills, grow your career, and explore
              <br /> top-rated content now
            </p>
            <div className="mt-3 space-y-3">
              <div className="flex space-x-2 items-center">
                <span className=" bg-yellow p-2 rounded-full">
                  <FaArrowRight />
                </span>
                <p>The Most World Class Instructors </p>
              </div>
              <div className="flex space-x-2 items-center">
                <span className=" bg-yellow p-2 rounded-full">
                  <FaArrowRight />
                </span>
                <p>Access Your Class anywhere </p>
              </div>
              <div className="flex space-x-2 items-center">
                <span className=" bg-yellow p-2 rounded-full">
                  <FaArrowRight />
                </span>
                <p>Flexible Course Plan</p>
              </div>
            </div>
           
          </div>
        </div>
        {/* <_____________________How We Start____________________> */}
        <div className=" bg-blue">
          <div className="py-20  flex flex-col items-center justify-center space-y-6 ">
            <div className=" bg-purple text-white  rounded-full py-2 px-4 font-semibold w-fit">
              How We Start Journey
            </div>
            <p className="text-white font-bold text-4xl">
              Start your Learning Journey Today!
            </p>
            <div className=" flex  space-x-36 justify-center">
              {journey.map((journey, index) => (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    {" "}
                    <img src={journey.img} alt="img" className="  " />
                  </div>

                  <p className="font-semibold text-white text-lg">
                    {journey.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <_____________________Our Testimonials____________________> */}
        <div className=" ">
          <div className="py-20  flex flex-col items-center justify-center space-y-3 ">
            <div className=" text-purple  rounded-full py-2 px-4 font-semibold w-fit">
              Our Testimonials
            </div>
            <div className=" font-bold text-4xl items-center ">
              What Students Think and Say
            </div>
            <div className=" font-bold text-4xl">About LearnLab</div>
            <div className="mt-6 relative max-w-6xl mx-auto px-20">
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 2000 }}
                navigation={{
                  nextEl: ".custom-swiper-next",
                  prevEl: ".custom-swiper-prev",
                }} // Ensure custom class names
                breakpoints={{
                  1024: { slidesPerView: 3 },
                  768: { slidesPerView: 2 },
                  640: { slidesPerView: 1 },
                }}
              >
                {reviews.map((item, index) => (
                  <SwiperSlide key={index} className="p-5">
                    <div className="bg-[#F8F9FF] p-6 rounded-lg shadow-md text-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 mx-auto rounded-full border-4 border-white -mt-10"
                      />
                      <h3 className="text-lg font-bold mt-3">{item.name}</h3>
                      <p className="text-gray-600 mt-2 text-sm">
                        “ {item.review} ”
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons - Use Custom Class Names */}
              <button className="custom-swiper-prev absolute left-0 top-1/2 transform -translate-y-1/2  bg-purple text-white p-3 rounded-full shadow-md hover:bg-yellow transition duration-300">
                <FaArrowLeft className="text-lg" />
              </button>
              <button className="custom-swiper-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple text-white p-3 rounded-full shadow-md hover:bg-yellow transition duration-300">
                <FaArrowRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default AboutUS;
