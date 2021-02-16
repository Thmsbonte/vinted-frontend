import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ offer_id, user_id }) => {
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);
    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: user_id,
      });
      const stripeToken = stripeResponse.token.id;
      try {
        const response = await axios.post("http://localhost:3100/payment", {
          stripeToken: stripeToken,
          offer_id: offer_id,
          user_id: user_id,
        });
        response.data.status === "succeeded" && setCompleted(true);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return !completed ? (
    <div className="Checkout-form">
      <div className="Checkout-order-summary">
        <h5>Résumé de la commande</h5>
        <div className="Checkout-order-summary-detail">
          <p>Commande</p> <span>0 €</span>
        </div>
        <div className="Checkout-order-summary-detail">
          <p>Frais protection acheteurs</p> <span>0 €</span>
        </div>
        <div className="Checkout-order-summary-detail">
          <p>Frais de port</p> <span>0 €</span>
        </div>
      </div>
      <div className="Checkout-order-final">
        <div className="Checkout-order-summary-total">
          <p>Total</p> <span>0 €</span>
        </div>
        <p>
          Il ne vous reste plus qu'un étape pour vous offrir null. Vous allez
          payer 0 € (frais de protection et frais de port inclus).
        </p>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="Card-element">
          <CardElement />
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  ) : errorMessage ? (
    <p>Il y a eu une erreur :{errorMessage}. Merci de réessayer</p>
  ) : (
    <p>Paiment réussi !</p>
  );
};

export default CheckoutForm;
