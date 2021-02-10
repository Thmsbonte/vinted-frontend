import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeOffer = ({ offer }) => {
  return (
    <div className="Home-offer">
      <div className="Home-offer-user">
        <img src={offer.owner.account.avatar.secure_url} alt="avatar" />
        <p>{offer.owner.account.username}</p>
      </div>
      <div className="Home-offer-picture">
        <img src={offer.product_image.secure_url} alt="" />
      </div>
      <div className="Home-offer-info">
        <div className="Home-offer-info-left">
          <p>{offer.product_price}</p>
          <p>{offer.product_details[1].TAILLE}</p>
          <p>{offer.product_details[0].MARQUE}</p>
        </div>
        <div className="Home-offer-info-right">
          <FontAwesomeIcon icon="heart" />
        </div>
      </div>
    </div>
  );
};

export default HomeOffer;
