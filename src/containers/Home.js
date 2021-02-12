import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";
import { useEffect } from "react";

const Home = ({ isLoading, fetchData, offers, setOffers }) => {
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement </p>
  ) : (
    <div className="Home">
      <Hero />
      <HomeContent offers={offers} setOffers={setOffers} />
    </div>
  );
};

export default Home;
