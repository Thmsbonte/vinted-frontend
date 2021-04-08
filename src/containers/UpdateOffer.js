import "./UpdateOffer.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, useParams } from "react-router-dom";
import UploadModal from "../components/UploadModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResponsiveMenu from "../components/ResponsiveMenu";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const UpdateOffer = ({
  modal,
  setModal,
  userInfo,
  setUser,
  setResponsiveMenu,
  responsiveMenu,
}) => {
  const server = "https://lereacteur-vinted-backend.herokuapp.com";
  //   const server = "http://localhost:3100";

  // States initialization
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [swap, setSwap] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingPicture, setLoadingPicture] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // Function : get offer information
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/offer/${id}`);

        const offerPictures = [];

        // Push offer picture(s) url(s) in prewiew tab
        for (let i = 0; i < response.data.product_image.length; i++) {
          offerPictures.push(response.data.product_image[i].secure_url);
        }
        setPreview(offerPictures);
        setTitle(response.data.product_name);
        setDescription(response.data.product_description);
        setBrand(response.data.product_details[0]?.MARQUE);
        setSize(response.data.product_details[1]?.TAILLE);
        setColor(response.data.product_details[3]?.COULEUR);
        setCondition(response.data.product_details[2]?.ETAT);
        setLocation(response.data.product_details[4]?.EMPLACEMENT);
        setPrice(response.data.product_price);
        setSwap(response.data.product_swap || false);
        setIsLoading(false); // Re-initialize loading state when request is done (success)
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message); // Set an "error message" state to display to the user
        setIsLoading(false); // Re-initialize loading state when request is done (error)
      }
    };

    fetchData();
  }, [id]);

  // Function : handle submit form submit-> send offer data to the backend
  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log("01", price);
    const newPrice = Number(price.toString().replace(",", ".")).toFixed(2);
    setErrorMessage(""); // Initialization of an error message state
    setLoadingModal(true); // Set "loading" modal state -> display of the modal
    const user_id = Cookies.get("user_id");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("location", location);
    formData.append("price", newPrice);
    formData.append("swap", swap);
    formData.append("user_id", user_id);

    const userToken = Cookies.get("userToken");
    try {
      console.log("02");
      const response = await axios.post(
        `${server}/offer/update/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("03", response.data._id);
      setLoadingModal(false); // Re-initialize loading state when request is done (success)
      history.push(`/offer/${response.data._id}`); // Redirection to the page of the new offer
    } catch (error) {
      setLoadingModal(false); // Re-initialize loading state when request is done (error)
      setErrorMessage(error.response.data?.message); // Set an "error message" to display to the user
    }
  };

  const handleDeletePicture = async (index) => {
    setLoadingPicture(true);
    const userToken = Cookies.get("userToken");
    try {
      const response = await axios.post(
        `${server}/offer/deletepicture`,
        { offer_id: id, image_index: index },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      const newPictures = [];
      if (response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          newPictures.push(response.data[i].secure_url);
        }
        setPreview(newPictures);
        setLoadingPicture(false);
      } else {
        setPreview([]);
        setLoadingPicture(false);
        // If no picture, clear input value to be able to upload again the same picture
        document.getElementById("newOffer_picture").value = null;
      }
    } catch (error) {
      setLoadingPicture(false);
      setErrorMessage(error.response?.data?.message); // Set an "error message" to display to the user
    }
  };

  const handleAddPicture = async (event, offer_id) => {
    setLoadingPicture(true);
    const formData = new FormData();
    formData.append(`picture`, event.target.files[0]);
    formData.append("offer_id", offer_id);
    const userToken = Cookies.get("userToken");
    try {
      const response = await axios.post(
        `${server}/offer/updatepicture`,
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        const newPreview = [...preview];
        newPreview.push(response.data.secure_url);
        setPreview(newPreview);
        setLoadingPicture(false);
      } else {
        setLoadingPicture(false);
        setErrorMessage(
          "Une erreur est survenue lors du chargement de l'image, merci de réessayer"
        );
      }
    } catch (error) {
      setLoadingPicture(false);
      setErrorMessage(error.response.data?.message); // Set an "error message" to display to the user
    }
  };

  return isLoading ? (
    <div className="Is-loading">
      <Loading />
    </div>
  ) : (
    <>
      {/*Display loading modal when needed*/}
      {loadingModal && <UploadModal />}
      {!responsiveMenu ? (
        <div className="Update-background">
          <div className="Update container">
            <h2>Modifie ton article</h2>
            <form>
              <div className="Update-product_picture">
                <div className="Update-product_picture-content">
                  {/*Display loaded picture*/}
                  <div className="Update-product_picture-content-preview">
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
                    {loadingPicture ? (
                      <Loading />
                    ) : preview.length < 4 ? (
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
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      name="newOffer_picture"
                      id="newOffer_picture"
                      onChange={(event) => {
                        handleAddPicture(event, id);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="Update-product_description Update-container">
                <div className="Update-product_details-title Update-product_details-container">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    name="newOffer_title"
                    id="newOffer_title"
                    placeholder="ex: Chemise Sézanne verte"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="Update-product_details-description Update-product_details-container">
                  <label>Décris ton article</label>
                  <input
                    type="text"
                    value={description}
                    name="newOffer_description"
                    id="newOffer_description"
                    placeholder="ex: Porté quelques fois, taille correctement"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>
              <div className="Update-product_details Update-container">
                <div className="Update-product_details-brand Update-product_details-container">
                  <label>Marque</label>
                  <input
                    type="text"
                    value={brand}
                    name="newOffer_brand"
                    id="newOffer_brand"
                    placeholder="ex: Zara"
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </div>
                <div className="Update-product_details-size Update-product_details-container">
                  <label>Taille</label>
                  <input
                    type="text"
                    value={size}
                    name="newOffer_size"
                    id="newOffer_size"
                    placeholder="ex: L / 40 / 12"
                    onChange={(event) => setSize(event.target.value)}
                  />
                </div>
                <div className="Update-product_details-color Update-product_details-container">
                  <label>Couleur</label>
                  <input
                    type="text"
                    value={color}
                    name="newOffer_color"
                    id="newOffer_color"
                    placeholder="ex: Fushia"
                    onChange={(event) => setColor(event.target.value)}
                  />
                </div>
                <div className="Update-product_details-condition Update-product_details-container">
                  <label>Etat</label>
                  <input
                    type="text"
                    value={condition}
                    name="newOffer_condition"
                    id="newOffer_condition"
                    placeholder="ex: Neuf avec étiquette"
                    onChange={(event) => setCondition(event.target.value)}
                  />
                </div>
                <div className="Update-product_details-location Update-product_details-container">
                  <label>Lieu</label>
                  <input
                    type="text"
                    value={location}
                    name="newOffer_location"
                    id="newOffer_location"
                    placeholder="ex: Paris"
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </div>
              </div>
              <div className="Update-product_price Update-container">
                <div className="Update-product_details-price Update-product_details-container">
                  <label>Prix</label>
                  <input
                    type="text"
                    value={price}
                    name="newOffer_price"
                    id="newOffer_price"
                    placeholder="0.00 €"
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="Update-swap Update-product_details-container">
                  <label>Échange</label>
                  <div>
                    <input
                      type="checkbox"
                      value={swap}
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
                className="Update-error-message"
                style={
                  errorMessage ? { display: "block" } : { display: "hidden" }
                }
              >
                {errorMessage}
              </p>
              <div className="Update-submit">
                <button type="submit" onClick={handleUpdate}>
                  Modifier
                </button>
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

export default UpdateOffer;
