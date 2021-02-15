import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import UploadModal from "../components/UploadModal";

const Publish = () => {
  const [newOffer, setNewOffer] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);

  const history = useHistory();

  const handleTextOnChange = (event) => {
    const newNewOffer = { ...newOffer };
    newNewOffer[event.target.id] = event.target.value;
    setNewOffer(newNewOffer);
  };

  const handleFileOnChange = (event) => {
    const newNewOffer = { ...newOffer };
    newNewOffer.newOffer_picture = event.target.files[0];
    setNewOffer(newNewOffer);
  };

  const handleCheckboxOnChange = (event) => {
    const newNewOffer = { ...newOffer };
    newNewOffer[event.target.id] = event.target.value;
    setNewOffer(newNewOffer);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoadingModal(true);

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

    console.log(Cookies.get("userToken"));
    const userToken = Cookies.get("userToken");
    try {
      const response = await axios.post(
        "http://localhost:3100/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Annonce ajoutée");
      setLoadingModal(false);
      history.push(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.message);
      setLoadingModal(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {loadingModal && <UploadModal />}
      <div className="Publish-background">
        <div className="Publish container">
          <h2>Vend ton article</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="Publish-product_picture">
              <input
                type="file"
                name="newOffer_picture"
                id="newOffer_picture"
                onChange={handleFileOnChange}
              />
            </div>
            <div className="Publish-product_description Publish-container">
              <div className="Publish-product_details-title Publish-product_details-container">
                <label>Title</label>
                <input
                  type="text"
                  name="newOffer_title"
                  id="newOffer_title"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-description Publish-product_details-container">
                <label>Décris ton article</label>
                <input
                  type="text"
                  name="newOffer_description"
                  id="newOffer_description"
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
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-size Publish-product_details-container">
                <label>Taille</label>
                <input
                  type="text"
                  name="newOffer_size"
                  id="newOffer_size"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-color Publish-product_details-container">
                <label>Couleur</label>
                <input
                  type="text"
                  name="newOffer_color"
                  id="newOffer_color"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-condition Publish-product_details-container">
                <label>Etat</label>
                <input
                  type="text"
                  name="newOffer_condition"
                  id="newOffer_condition"
                  onChange={handleTextOnChange}
                />
              </div>
              <div className="Publish-product_details-location Publish-product_details-container">
                <label>Lieu</label>
                <input
                  type="text"
                  name="newOffer_location"
                  id="newOffer_location"
                  onChange={handleTextOnChange}
                />
              </div>
            </div>
            <div className="Publish-product_price Publish-container">
              <div className="Publish-product_details-price Publish-product_details-container">
                <label>Price</label>
                <input
                  type="text"
                  name="newOffer_price"
                  id="newOffer_price"
                  onChange={handleTextOnChange}
                />
              </div>
            </div>
            <div className="Publish-swap">
              <input
                type="checkbox"
                name="newOffer_swap"
                id="newOffer_swap"
                onChange={handleCheckboxOnChange}
              />
            </div>
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
