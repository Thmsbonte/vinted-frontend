import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";
import { useEffect } from "react";

const Home = ({ isLoading, fetchData, offers, setOffers, errorMessage }) => {
  useEffect(() => {
    fetchData();
  }, []);

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
