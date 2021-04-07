import "./DeleteModal.scss";
import Cookies from "js-cookie";

const DeleteModal = ({ handleDelete, setModalDelete, offer_id, user_id }) => {
  return (
    <div className="Modal">
      <div className="Delete-modal">
        <p>
          Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est
          définitive.
        </p>
        <div className="Delete-modal-buttons">
          <button
            onClick={() => handleDelete(offer_id, Cookies.get("user_id"))}
          >
            Supprimer
          </button>
          <button onClick={() => setModalDelete(false)}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
