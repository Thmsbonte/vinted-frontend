import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const HomeOffer = ({ offer }) => {
  return (
    <Link
      to={`/Offer/${offer._id}`}
      className="Home-offer"
      style={{ textDecoration: "none" }}
    >
      <div className="Home-offer-user">
        <img src={offer.owner.account.avatar.secure_url} alt="avatar" />
        <p>{offer.owner.account.username}</p>
      </div>
      <div className="Home-offer-picture">
        <img src={offer.product_image.secure_url} alt="" />
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
