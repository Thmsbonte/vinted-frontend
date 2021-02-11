import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-backend.herokuapp.com/offer/${id}`
      );
      setOffer(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="Offer-background">
      <div className="Offer container">
        <div className="Offer-product_image">
          <img src={offer.product_image.secure_url} alt="Product" />
        </div>
        <div className="Offer-product_info">
          <span>{offer.product_price}</span>
          {offer.product_details.map((item) => {
            let objectKeys = Object.keys(item);
            console.log(objectKeys);
            return (
              <div className="Offer-product_details">
                <p>{objectKeys[0]}</p>
                <p>{item[objectKeys[0]]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Offer;
