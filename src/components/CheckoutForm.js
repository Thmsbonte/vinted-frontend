import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutModal from "./CheckoutModal";
import { useHistory } from "react-router-dom";

const CheckoutForm = ({ offer_id, user_id, offer }) => {
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const protectionFees = 0.5;
  const deliveryFees = 4.5;
  const totalPrice =
    Number(offer.product_price) + protectionFees + deliveryFees;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoadingModal(true);

    const cardElement = elements.getElement(CardElement);
    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: user_id,
      });
      const stripeToken = stripeResponse.token.id;
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-backend.herokuapp.com/payment",
          {
            stripeToken: stripeToken,
            offer_id: offer_id,
            user_id: user_id,
          }
        );
        response.data.status === "succeeded" && setCompleted(true);
        setLoadingModal(false);
        // Automatic redirection to home page
        setTimeout(() => history.push("/"), 3000);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
        setLoadingModal(false);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setLoadingModal(false);
    }
  };

  return !completed ? (
    <>
      {loadingModal && <CheckoutModal />}
      <div className="Checkout-form">
        <div className="Checkout-order-summary">
          <h5>Résumé de la commande</h5>
          <div className="Checkout-order-summary-detail">
            <p>Commande</p> <span>{offer.product_price} €</span>
          </div>
          <div className="Checkout-order-summary-detail">
            <p>Frais protection acheteurs</p> <span>{protectionFees} €</span>
          </div>
          <div className="Checkout-order-summary-detail">
            <p>Frais de port</p> <span>{deliveryFees} €</span>
          </div>
        </div>
        <div className="Checkout-order-final">
          <div className="Checkout-order-summary-total">
            <p>Total</p> <span>{totalPrice} €</span>
          </div>
          <p>
            Il ne vous reste plus qu'un étape pour vous offrir{" "}
            <strong>"{offer.product_name}"</strong>. Vous allez payer{" "}
            <strong>{totalPrice} €</strong> (frais de protection et frais de
            port inclus).
          </p>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="Card-element">
            <CardElement />
          </div>
          <button type="submit">Pay</button>
        </form>
      </div>
    </>
  ) : errorMessage ? (
    <div className="Checkout-error">
      <p>Il y a eu une erreur :{errorMessage}. Merci de réessayer</p>
    </div>
  ) : (
    <div className="Checkout-success">
      <p>
        <strong>Paiment réussi !</strong> Vous allez être automatiquement
        redirigé vers la page d'accueil.
      </p>
    </div>
  );
};

export default CheckoutForm;
