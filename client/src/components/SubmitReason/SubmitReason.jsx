import React from 'react';
import { LuWallet } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { PiCarSimpleBold } from "react-icons/pi";

const skillsData = [
    {
        name: "Earn Additional Income",
        icon: <LuWallet className="text-6xl text-primary group-hover:text-white duration-300" />,
        link: "#",
        description: "An unused car can earn you an average of $500 per month.",
        aosDelay: "0"
    },
    {
        name: "You Are Covered!",
        icon: <GiNotebook className="text-6xl text-primary group-hover:text-white duration-300" />,
        link: "#",
        description: "Dallas Pro Rental has worked with big-name rental insurance company to ensure the safety of your car.",
        aosDelay: "500"
    },
    {
        name: "You Don't Need Extra Work",
        icon: <PiCarSimpleBold className="text-6xl text-primary group-hover:text-white duration-300" />,
        link: "#",
        description: "Have us managing your cars, you can still work your day job or enjoy your life.",
        aosDelay: "1000"
    },
];

const SubmitReason = () => {
  return (
    <div id="services" className="py-20 bg-black text-white sm:min-h-[700px] sm:grid sm:place-items-center">
        <div className="container mx-auto px-6">
            <div className="pb-12">
                <h1 className="text-4xl font-semibold text-center font-serif">Why Partner With Us?</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {skillsData.map((skill) => (
                    <div key={skill.name} data-aos="fade-up" data-aos-delay={skill.aosDelay} className="card text-center group space-y-4 p-8 bg-gray-800 rounded-lg">
                        <div className="grid place-items-center">{skill.icon}</div>
                        <h1 className="text-xl font-bold">{skill.name}</h1>
                        <p>{skill.description}</p>
                        {/* <a href={skill.link}>Learn More</a> */}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default SubmitReason;
