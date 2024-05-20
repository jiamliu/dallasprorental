import React from 'react';
import { useParams } from 'react-router-dom';
import ListingHero from './ListingHero';
import ListingDetail from './ListingDetail';
import Footer from '../Footer/Footer.jsx';


const Listing = () => {
  const { carId } = useParams();  

  return (
    <div>
      <ListingHero carId={carId} />
      <ListingDetail carId={carId} />
      <Footer />
    </div>
  );
};

export default Listing;
