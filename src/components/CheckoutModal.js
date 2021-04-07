import "./CheckoutModal.scss";
import Loading from "../components/Loading";

const CheckoutModal = () => {
  return (
    <div className="Modal">
      <div className="Upload-modal">
        <p>Paiement en cours. Merci de patienter.</p>
        <Loading />
      </div>
    </div>
  );
};

export default CheckoutModal;
