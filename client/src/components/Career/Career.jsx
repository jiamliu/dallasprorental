//Apply Now button should lead applicant to respective position in LinkedIn
//Submit Resume buttob should lead applicant to DPR official LinkedIn page
//The purpose of this setup is to prevent bugs after launching

import React, { useState } from 'react';
import Footer from '../Footer/Footer.jsx';
import CareerHero from '../CareerHero/CareerHero.jsx';


function Career() {
    const jobs = [
        { title: 'IOS Engineer', location: 'Dallas, TX', description: 'Develop cutting-edge web applications.' },
        { title: 'Product Manager', location: 'Remote', description: 'Lead the roadmap of our tech products.' },
        { title: 'Graphic Designer', location: 'Dallas, TX', description: 'Create engaging designs for digital and print media.' },
        { title: 'Customer Relation Representative', location: 'Dallas, TX', description: 'Providing real-time customer relationship calls with our customers.' },
        { title: 'UX Designer', location: 'Remote', description: 'Design user-friendly interfaces for software and apps.' },
        { title: 'Systems Administrator', location: 'Remote', description: 'Maintain and configure IT systems and networks.' },
        { title: 'Marketing Specialist', location: 'Dallas, TX', description: 'Drive marketing strategies and campaigns.' },
        { title: 'Inside Sales Associate', location: 'Dallas, TX', description: 'Lead sales efforts and meet quarterly targets.' },
        { title: 'Customer Relation Representative', location: 'Austin, TX', description: 'Providing real-time customer relationship calls with our customers.' },
        { title: 'Detailing Specialist - part time', location: 'Dallas, TX', description: 'Provide vehicle detailing services to our inventory.' },
        { title: 'Detailing Specialist - part time', location: 'Austin, TX', description: 'Provide vehicle detailing services to our inventory.' },
        { title: 'Detailing Specialist - part time', location: 'Atlanta, GA', description: 'Provide vehicle detailing services to our inventory.' },
        { title: 'New Store Manager', location: 'Atlanta, GA', description: 'Lead newly opened Atlanta rental hub\'s day-to-day operations.' },
        { title: 'Customer Service Representative', location: 'Atlanta, GA', description: 'Providing real-time customer relationship calls with our customers.' },
        { title: 'Marketing Specialist', location: 'Atlanta, GA', description: 'Drive marketing strategies and campaigns.' },
        { title: 'Vehicle Repair - Mechanics', location: 'Atlanta, GA', description: 'Maintain and repair vehicles, ensuring optimal functionality and safety.' },
    ];

    const photos = [
        { id: 1, src: 'src/assets/career-asset/career1.jpeg', description: 'Showcasing career growth opportunities: Join us and ascend your career ladder in a supportive and dynamic environment.' },
        { id: 2, src: 'src/assets/career-asset/career2.jpeg', description: 'Emphasizing diversity and inclusion: We celebrate diverse perspectives and strive for an inclusive workplace for all our team members.' },
        { id: 3, src: 'src/assets/career-asset/career3.jpeg', description: 'Focusing on professional development: Invest in your future with our comprehensive training programs and professional development opportunities.' }
    ];

    const [activePhoto, setActivePhoto] = useState(null);

    const togglePhotoDescription = (id) => {
        setActivePhoto(activePhoto === id ? null : id);
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary text-black">
            <CareerHero />
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {jobs.map((job, index) => (
                        <div key={index} className="bg-gray-100 shadow-lg rounded-lg p-6" style={{ aspectRatio: '1 / 1' }} data-aos="fade-up" data-aos-duration="500">
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <p className="text-slate-600">{job.location}</p>
                            <p className="mt-3">{job.description}</p>
                            <button className="mt-4 bg-primary text-slate-600 px-4 py-2 rounded hover:bg-slate-700 transition-colors">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-primary text-black text-center p-12">
                <div className="container mx-auto px-4 py-12 flex justify-center space-x-32">
                    {photos.map(photo => (
                        <div key={photo.id} className="relative group">
                            <img src={photo.src} alt="Job related" className="w-96 h-72 object-cover transition duration-300 ease-in-out transform hover:scale-105 rounded-lg" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out font-serif">
                                {photo.description}
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="text-3xl font-bold font-serif">Don't see the right job?</h2>
                <p className="text-black mt-3">Submit your resume, and we'll get in touch as soon as something comes up.</p>
                <p className="text-black mt-3">If you are located within North America and need any accommodations with the online job application procedure due to a disability, you may contact 1-903-803-7036, between the hours of 8:30 AM and 4:30 PM EST.</p>
                <button className="text-white mt-4 bg-slate-500 px-6 py-3 rounded hover:bg-slate-600 transition-colors">
                    Submit Resume
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default Career;
