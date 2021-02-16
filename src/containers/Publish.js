import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import UploadModal from "../components/UploadModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = () => {
  // States initialization
  const [newOffer, setNewOffer] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);

  const history = useHistory();

  // Function : handle all the text input
  const handleTextOnChange = (event) => {
    const newNewOffer = { ...newOffer };
    newNewOffer[event.target.id] = event.target.value;
    setNewOffer(newNewOffer);
  };

  // Function : handle all the picture upload
  const handleFileOnChange = (event) => {
    const newNewOffer = { ...newOffer };
    newNewOffer.newOffer_picture = event.target.files[0];
    setNewOffer(newNewOffer);
  };

  // Function : handle swap checkbox
  const handleCheckboxOnChange = (event) => {
    const newNewOffer = { ...newOffer };
    newNewOffer[event.target.id] = event.target.value;
    setNewOffer(newNewOffer);
  };

  // Function : handle submit form submit-> send offer data to the backend
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Initialization of an error message state
    setLoadingModal(true); // Set "loading" modal state -> display of the modal

    const formData = new FormData();
    formData.append("picture", newOffer.newOffer_picture);
    formData.append("title", newOffer.newOffer_title);
    formData.append("description", newOffer.newOffer_description);
    formData.append("brand", newOffer.newOffer_brand);
    formData.append("size", newOffer.newOffer_size);
    formData.append("color", newOffer.newOffer_color);
    formData.append("condition", newOffer.newOffer_condition);
    formData.append("location", newOffer.newOffer_location);
    formData.append("price", newOffer.newOffer_price);
    formData.append("swap", newOffer.newOffer_swap);

    const userToken = Cookies.get("userToken");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-backend.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLoadingModal(false); // Re-initialize loading state when request is done (success)
      history.push(`/offer/${response.data._id}`); // Redirection to the page of the new offer
    } catch (error) {
      setLoadingModal(false); // Re-initialize loading state when request is done (error)
      setErrorMessage(error.response.data.message); // Set an "error message" to display to the user
    }
  };

  return (
    <>
      {/*Display loading modal when needed*/}
      {loadingModal && <UploadModal />}
      <div className="Publish-background">
        <div className="Publish container">
          <h2>Vend ton article</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="Publish-product_picture">
              <div className="Publish-product_picture-content">
                <label for="newOffer_picture">
                  <i>
                    <FontAwesomeIcon icon="plus" size="2x" />
                  </i>
                  <p>Ajoute une photo</p>{" "}
                </label>
                <input
                  type="file"
                  name="newOffer_picture"
                  id="newOffer_picture"
                  onChange={handleFileOnChange}
                />
              </div>
            </div>
            <div className="Publish-product_description Publish-container">
              <div className="Publish-product_details-title Publish-product_details-container">
                <label>Title</label>
                <input
                  type="text"
                  name="newOffer_title"
                  id="newOffer_title"
                  placeholder="ex: Chemise Sézanne verte"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-description Publish-product_details-container">
                <label>Décris ton article</label>
                <input
                  type="text"
                  name="newOffer_description"
                  id="newOffer_description"
                  placeholder="ex: Porté quelques fois, taille correctement"
                  onChange={handleTextOnChange}
                />
              </div>
            </div>
            <div className="Publish-product_details Publish-container">
              <div className="Publish-product_details-brand Publish-product_details-container">
                <label>Marque</label>
                <input
                  type="text"
                  name="newOffer_brand"
                  id="newOffer_brand"
                  placeholder="ex: Zara"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-size Publish-product_details-container">
                <label>Taille</label>
                <input
                  type="text"
                  name="newOffer_size"
                  id="newOffer_size"
                  placeholder="ex: L / 40 / 12"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-color Publish-product_details-container">
                <label>Couleur</label>
                <input
                  type="text"
                  name="newOffer_color"
                  id="newOffer_color"
                  placeholder="ex: Fushia"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-condition Publish-product_details-container">
                <label>Etat</label>
                <input
                  type="text"
                  name="newOffer_condition"
                  id="newOffer_condition"
                  placeholder="ex: Neuf avec étiquette"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-location Publish-product_details-container">
                <label>Lieu</label>
                <input
                  type="text"
                  name="newOffer_location"
                  id="newOffer_location"
                  placeholder="ex: Paris"
                  onChange={handleTextOnChange}
                />
              </div>
            </div>
            <div className="Publish-product_price Publish-container">
              <div className="Publish-product_details-price Publish-product_details-container">
                <label>Prix</label>
                <input
                  type="text"
                  name="newOffer_price"
                  id="newOffer_price"
                  placeholder="0.00 €"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-swap Publish-product_details-container">
                <label>Échange</label>
                <div>
                  <input
                    type="checkbox"
                    name="newOffer_swap"
                    id="newOffer_swap"
                    onChange={handleCheckboxOnChange}
                  />{" "}
                  <label for="newOffer_swap">
                    Je suis intéressé par les échanges
                  </label>
                </div>
              </div>
            </div>
            {/*Display error message when needed*/}
            <p
              className="Publish-error-message"
              style={
                errorMessage ? { display: "block" } : { display: "hidden" }
              }
            >
              {errorMessage}
            </p>
            <div className="Publish-submit">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Publish;
