import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../Footer/Footer';
import SubmitHero from '../SubmitHero/SubmitHero';
import SubmitReason from '../SubmitReason/SubmitReason';

const SubmitCarForm = () => {
  const [carInfo, setCarInfo] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    license_plate: '', 
    owner_name: '', 
    owner_contact: '', 
    photos: []
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setCarInfo(prevState => ({ ...prevState, photos: files }));
    } else {
      setCarInfo(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(carInfo).forEach(([key, value]) => {
      if (key !== 'photos') {
        formData.append(key, value);
      } else {
        Array.from(value).forEach(file => {
          formData.append('photos', file);
        });
      }
    });

    const apiUrl = 'http://127.0.0.1:8000/api/cars/';
    fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit car');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('Car submitted successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to submit car');
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary text-black">
      <SubmitHero />
      <SubmitReason />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold font-serif text-center mb-6">Submit Your Car</h1>
        <p className="text-lg text-center mb-8 max-w-2xl">Submit your vehicle to generate additional income. Our representative will contact you ASAP.</p>
        <div data-aos="fade-up" data-aos-duration="500" className="w-full max-w-2xl bg-slate-700 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center">
            {Object.entries(carInfo).map(([key, value]) => key !== 'photos' && (
              <div key={key} className="w-full mb-6">
                <label className="block text-white text-sm font-bold mb-2">{key.replace('_', ' ').toUpperCase()}</label>
                <input 
                  type={key === 'license_plate' || key === 'owner_contact' ? 'text' : key}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  value={value}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            ))}
            <div className="w-full mb-6">
              <label className="block text-white text-sm font-bold mb-2">PHOTOS</label>
              <label className="custom-file-upload bg-gray-200 text-gray-700 py-2 px-4 text-sm rounded cursor-pointer inline-block hover:bg-gray-300 transition-colors">
                <input 
                  type="file"
                  name="photos"
                  onChange={handleChange}
                  multiple
                  className="hidden"
                />
                Choose File
              </label>
            </div>
            <div className="w-full flex justify-center">
              <button type="submit" className="bg-primary text-white py-2 px-4 rounded font-bold hover:bg-primary-dark transition-colors">Submit Car</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitCarForm;

























