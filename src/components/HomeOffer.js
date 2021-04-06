import "./HomeOffer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HomeOffer = ({ offer }) => {
  return (
    <Link // Link to the offer
      to={`/Offer/${offer._id}`}
      className="Home-offer"
      style={{ textDecoration: "none" }}
    >
      <div className="Home-offer-user">
        <img src={offer.owner.account.avatar.secure_url} alt="avatar" />
        <p>{offer.owner.account.username}</p>
      </div>
      <div className="Home-offer-picture">
        {/* We handle offers created before the possibility of uploading multi-images */}
        {offer.product_image[0] ? (
          <img src={offer.product_image[0].secure_url} alt="Product" />
        ) : (
          <img src={offer.product_image.secure_url} alt="Product" />
        )}
      </div>
      <div className="Home-offer-info">
        <div className="Home-offer-info-left">
          <p>
            <span>{offer.product_price} €</span>
          </p>
          <p>{offer.product_details[1].TAILLE}</p>
          <p>{offer.product_details[0].MARQUE}</p>
        </div>
        <div className="Home-offer-info-right">
          <FontAwesomeIcon icon="heart" className="Icon-heart" />
        </div>
      </div>
    </Link>
  );
};

export default HomeOffer;
