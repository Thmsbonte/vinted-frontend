import "./UploadModal.scss";
import Loading from "../components/Loading";

const UploadModal = () => {
  return (
    <div className="Modal">
      <div className="Upload-modal">
        <p>Votre annonce est en cours de téléchargement. Merci de patienter.</p>
        <Loading />
      </div>
    </div>
  );
};

export default UploadModal;
