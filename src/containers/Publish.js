import "./Publish.scss";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import UploadModal from "../components/UploadModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResponsiveMenu from "../components/ResponsiveMenu";
import Footer from "../components/Footer";

const Publish = ({
  modal,
  setModal,
  userInfo,
  setUser,
  setResponsiveMenu,
  responsiveMenu,
}) => {
  // States initialization
  const [picture, setPicture] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [swap, setSwap] = useState(false);

  const [preview, setPreview] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);

  const history = useHistory();

  // Function : handle submit form submit-> send offer data to the backend
  const handleOnSubmit = async (event) => {
    const newPrice = Number(price.replace(",", ".")).toFixed(2);
    event.preventDefault();
    setErrorMessage(""); // Initialization of an error message state
    setLoadingModal(true); // Set "loading" modal state -> display of the modal
    const formData = new FormData();
    for (let i = 0; i < picture.length; i++) {
      formData.append(`picture${i}`, picture[i]);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("location", location);
    formData.append("price", newPrice);
    formData.append("swap", swap);

    const server =
      "https://lereacteur-vinted-backend.herokuapp.com/offer/publish";
    // const server = "http://localhost:3100/offer/publish";
    const userToken = Cookies.get("userToken");
    try {
      const response = await axios.post(server, formData, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      setLoadingModal(false); // Re-initialize loading state when request is done (success)
      history.push(`/offer/${response.data._id}`); // Redirection to the page of the new offer
    } catch (error) {
      setLoadingModal(false); // Re-initialize loading state when request is done (error)
      setErrorMessage(error.response.data?.message); // Set an "error message" to display to the user
    }
  };

  const handleDeletePicture = (index) => {
    const numberOfPicture = picture.length;
    const newPicture = [...picture];
    newPicture.splice(index, 1);
    setPicture(newPicture);
    const newPreview = [...preview];
    newPreview.splice(index, 1);
    setPreview(newPreview);
    // If it's last picture, clear input value to be able to upload again the same picture
    if (numberOfPicture <= 1) {
      document.getElementById("newOffer_picture").value = null;
    }
  };

  return (
    <>
      {/*Display loading modal when needed*/}
      {loadingModal && <UploadModal />}
      {!responsiveMenu ? (
        <div className="Publish-background">
          <div className="Publish container">
            <h2>Vend ton article</h2>
            <form onSubmit={handleOnSubmit}>
              <div className="Publish-product_picture">
                <div className="Publish-product_picture-content">
                  {/*Display loaded picture*/}
                  <div className="Publish-product_picture-content-preview">
                    {preview.length > 0 &&
                      preview.map((path, index) => {
                        return (
                          <div className="Picture-uploaded" key={index}>
                            <i
                              /*On click on the cross, we update picture preview and pictures to upload*/
                              onClick={() => {
                                handleDeletePicture(index);
                              }}
                            >
                              <FontAwesomeIcon icon="times-circle" />
                            </i>
                            <img src={path} alt="Upload" />
                          </div>
                        );
                      })}
                  </div>
                  <div className="Upload-file">
                    {/* Add maximum 4 pictures */}
                    {picture.length < 4 ? (
                      <label
                        style={
                          preview.length > 4
                            ? { display: "none" }
                            : { display: "flex" }
                        }
                        for="newOffer_picture"
                      >
                        <i>
                          <FontAwesomeIcon icon="plus" size="2x" />
                        </i>
                        <p>Ajoute une photo</p>{" "}
                      </label>
                    ) : (
                      <p>Vous pouvez ajouter 4 photos maximum.</p>
                    )}
                    <input
                      // multiple={true}
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      name="newOffer_picture"
                      id="newOffer_picture"
                      onChange={(event) => {
                        const newPicture = [...picture];
                        newPicture.push(event.target.files[0]);
                        setPicture(newPicture);
                        const newPreview = [...preview];
                        newPreview.push(
                          URL.createObjectURL(event.target.files[0])
                        );
                        setPreview(newPreview);
                      }}
                    />
                  </div>
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
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="Publish-product_details-description Publish-product_details-container">
                  <label>Décris ton article</label>
                  <input
                    type="text"
                    name="newOffer_description"
                    id="newOffer_description"
                    placeholder="ex: Porté quelques fois, taille correctement"
                    onChange={(event) => setDescription(event.target.value)}
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
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </div>
                <div className="Publish-product_details-size Publish-product_details-container">
                  <label>Taille</label>
                  <input
                    type="text"
                    name="newOffer_size"
                    id="newOffer_size"
                    placeholder="ex: L / 40 / 12"
                    onChange={(event) => setSize(event.target.value)}
                  />
                </div>
                <div className="Publish-product_details-color Publish-product_details-container">
                  <label>Couleur</label>
                  <input
                    type="text"
                    name="newOffer_color"
                    id="newOffer_color"
                    placeholder="ex: Fushia"
                    onChange={(event) => setColor(event.target.value)}
                  />
                </div>
                <div className="Publish-product_details-condition Publish-product_details-container">
                  <label>Etat</label>
                  <input
                    type="text"
                    name="newOffer_condition"
                    id="newOffer_condition"
                    placeholder="ex: Neuf avec étiquette"
                    onChange={(event) => setCondition(event.target.value)}
                  />
                </div>
                <div className="Publish-product_details-location Publish-product_details-container">
                  <label>Lieu</label>
                  <input
                    type="text"
                    name="newOffer_location"
                    id="newOffer_location"
                    placeholder="ex: Paris"
                    onChange={(event) => setLocation(event.target.value)}
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
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="Publish-swap Publish-product_details-container">
                  <label>Échange</label>
                  <div>
                    <input
                      type="checkbox"
                      name="newOffer_swap"
                      id="newOffer_swap"
                      onChange={(event) => setSwap(event.target.value)}
                    />{" "}
                    <label>Je suis intéressé par les échanges</label>
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

export default Publish;
