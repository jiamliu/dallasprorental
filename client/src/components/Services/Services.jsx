import React from 'react'
import {LuWallet} from "react-icons/lu"
import {GiNotebook} from "react-icons/gi"
import {PiCarSimpleBold} from "react-icons/pi"


const skillsData = [
    {
        name: "Best Price In Town",
        icon: (
            <LuWallet className="text-5xl text-primary group-hover:text-black duration-300" />
        ),
        link: "#",
        description: "Dallas Pro Rental is aiming to make your rental experiences affordable, by providing the best price in town.",
        aosDelay: "0"
    },
    {
        name: "Fast and Convenience",
        icon: (
            <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />
        ),
        link: "#",
        description: "Experience swift and convenient service with Dallas Pro Rental—effortless booking, exceptional care.",
        aosDelay: "500"
    },
    {
        name: "Wide Inventory Selection",
        icon: (
            <PiCarSimpleBold className="text-5xl text-primary group-hover:text-black duration-300" />
        ),
        link: "#",
        description: "From compact cars to large SUV, Dallas Pro Rental offers a wide selection of vehicles to suit every need.",
        aosDelay: "1000"
    },
]
const Services = () => {
  return (
    <div id="services" className="py-14 dark:bg-black dark:text-white sm:min-h[600px] sm:grid sm:place-items-center">
        <div className="container">
            <div className="pb-12">
                <h1 className="text-3xl font-semibold text-center font-serif sm:text-4xl">Why Choose Dallas Pro Rental?</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skillsData.map((skill) => (
                    <div key={skill.name} data-aos="fade-up" data-aos-delay={skill.aosDelay} className="card text-center  group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg">
                        <div className="grid place-items-center">{skill.icon}</div>
                        <h1>{skill.name}</h1>
                        <p>{skill.description}</p>
                        <a href={skill.link}>Learn More</a>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Services