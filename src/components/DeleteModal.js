import "./DeleteModal.scss";
import Loading from "./Loading";

const DeleteModal = ({ handleDelete, setModalDelete, offer_id, isLoading }) => {
  return (
    <div className="Modal">
      <div className="Delete-modal">
        <p>
          Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est
          définitive.
        </p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="Delete-modal-buttons">
            <button onClick={() => handleDelete(offer_id)}>Supprimer</button>
            <button onClick={() => setModalDelete(false)}>Annuler</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
