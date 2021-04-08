import "./MyOfferCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DeleteModal from "./DeleteModal";

const MyOfferCard = ({ offer, setErrorMessage }) => {
  let history = useHistory();
  const [modalDelete, setModalDelete] = useState(false);
  const handleDelete = async (offer_id) => {
    const userToken = Cookies.get("userToken");
    if (offer_id) {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-backend.herokuapp.com/offer/delete",
          {
            offer_id: offer_id,
          },
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          setModalDelete(false);
          window.location.reload(false);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("Merci de vous connecter pour supprimer une annonce");
    }
    setModalDelete(true);
  };
  return (
    <>
      <div>
        {modalDelete && (
          <DeleteModal
            handleDelete={handleDelete}
            setModalDelete={setModalDelete}
            offer_id={offer._id}
          />
        )}
      </div>
      <div className="My-offer" style={{ textDecoration: "none" }}>
        <div className="My-offer-user">
          <img src={offer.owner.account.avatar.secure_url} alt="avatar" />
          <p>{offer.owner.account.username}</p>
        </div>
        {/* Link to the offer */}
        <div
          className="My-offer-picture"
          onClick={() => {
            history.push(`/offer/${offer._id}`);
          }}
        >
          {/* We handle offers created before the possibility of uploading multi-images */}
          {offer.product_image[0] ? (
            <img src={offer.product_image[0].secure_url} alt="Product" />
          ) : (
            <img src={offer.product_image.secure_url} alt="Product" />
          )}
        </div>
        <div className="My-offer-info">
          <div className="My-offer-info-top">
            <div className="My-offer-info-left">
              <p>
                <span>{offer.product_price} €</span>
              </p>
            </div>
            <div className="My-offer-info-right">
              <FontAwesomeIcon icon="heart" className="Icon-heart" />
            </div>
          </div>
          <div className="My-offer-buttons">
            <button
              onClick={() => {
                history.push(`/offer/update/${offer._id}`);
              }}
            >
              Modifier l'annonce
            </button>
            <button onClick={() => setModalDelete(!modalDelete)}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
