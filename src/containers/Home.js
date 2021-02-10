import Header from "../components/Header";
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [offers, setOffers] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-backend.herokuapp.com/offers"
    );
    setOffers(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(offers);
  return (
    <div className="Home">
      <Header />
      <Hero />
      <HomeContent offers={offers} setOffers={setOffers} />
    </div>
  );
};

export default Home;
