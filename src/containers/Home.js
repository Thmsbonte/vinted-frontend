import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";
import { useEffect } from "react";

const Home = ({ isLoading, offers, setOffers, errorMessage }) => {
  // Display loading or error message from fetchData() App containers
  return isLoading ? (
    <p className="Is-loading">En cours de chargement </p>
  ) : errorMessage ? (
    <p className="Error-message">{errorMessage} </p>
  ) : (
    <div className="Home">
      <Hero />
      <HomeContent offers={offers} setOffers={setOffers} />
    </div>
  );
};

export default Home;
