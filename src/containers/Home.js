import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-backend.herokuapp.com/offers"
    );
    setOffers(response.data);
    setIsLoading(false);
  };

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
