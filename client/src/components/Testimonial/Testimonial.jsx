import React from "react";

import client1 from "../../assets/lindsey.jpg";
import client2 from "../../assets/juan.jpg";
import client3 from "../../assets/sabrina.jpeg";

const testimonialData = [
  {
    name: "Lindsey from Austin, TX",
    image: client1, // Reference the imported image variable
    description: "Great host my 2nd time renting with them and they are always quickly responding to requests and changes and very accommodating!",
    aosDelay: "0",
  },
  {
    name: "Juan from Miami, FL",
    image: client2, // Reference the imported image variable
    description: "The owner of the car is so nice and so sweet. his text back time is good. The car was smelling so nice and looking so good when I first got it. The car drives so smoothly and the bass of the car is good.",
    aosDelay: "300",
  },
  {
    name: "Sabrina from Dallas, TX",
    image: client3, // Reference the imported image variable
    description: "The vehicle was super clean and drove smoothly. It had all the features I preferred. Good on gas mileage for vehicle in its class. The communication with the host was excellent! Pick up and drop off was a breeze!",
    aosDelay: "1000",
  },
];

const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              With over 150 five-star reviews over the past one year, Dallas Pro Rental is one of the selected few Turo host to achieve All-Star Host status.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((testimonial) => (
              <div
                key={testimonial.name}
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300 rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{testimonial.description}</p>
                <p className="text-center font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
