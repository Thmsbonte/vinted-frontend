import "./Payment.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ResponsiveMenu from "../components/ResponsiveMenu";

// Variable d'environnement de fonctionne pas
const stripePromise = loadStripe(
  "pk_test_51ILU3GD8pKdAtwrKx8M5VPy6jeJ40IToklFd6C7T3nRdFDDeFvdk34Mqi70WTXmBVz9nMBHdTZ9cora5v3j2HEn2000zwgBuIr"
);

const Payment = ({
  modal,
  setModal,
  userInfo,
  setUser,
  setResponsiveMenu,
  responsiveMenu,
}) => {
  const location = useLocation();
  const offer_id = location.state.offer_id;
  const offer = location.state.offer;
  return (
    <>
      {!responsiveMenu ? (
        <div className="Payment">
          <Elements stripe={stripePromise}>
            <CheckoutForm offer_id={offer_id} offer={offer} />
          </Elements>
        </div>
      ) : (
        <ResponsiveMenu
          userInfo={userInfo}
          setUser={setUser}
          setModal={setModal}
          modal={modal}
          setResponsiveMenu={setResponsiveMenu}
        />
      )}
      <Footer />
    </>
  );
};
export default Payment;
