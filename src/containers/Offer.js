import "./Offer.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import ResponsiveMenu from "../components/ResponsiveMenu";
import Loading from "../components/Loading";

const Offer = ({
  modal,
  setModal,
  userInfo,
  setUser,
  setResponsiveMenu,
  responsiveMenu,
}) => {
  // States and params initialization
  const { id } = useParams();
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(0); // Allow to determine which image is displayed in big

  // Get offer information only once at the opening of the page
  useEffect(() => {
    // Function : get offer information
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-backend.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false); // Re-initialize loading state when request is done (success)
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message); // Set an "error message" state to display to the user
        setIsLoading(false); // Re-initialize loading state when request is done (error)
      }
    };

    fetchData();
  }, [id]);

  // Display loading or error messages when needed
  return isLoading ? (
    <div className="Is-loading">
      <Loading />
    </div>
  ) : errorMessage ? (
    <p className="Error-message">{errorMessage} </p>
  ) : (
    <>
      {!responsiveMenu ? (
        <div className="Offer-background">
          <div className="Offer container">
            <div className="Offer-product_images">
              <div className="Offer-product_other_images">
                {offer.product_image[0] &&
                  offer.product_image.map((elem, index) => {
                    return (
                      <img
                        src={elem.secure_url}
                        alt="Product"
                        key={index}
                        onClick={() => {
                          setImage(index);
                        }}
                        style={
                          image === index
                            ? {
                                borderWidth: 2,
                                borderStyle: "solid",
                                borderBlockColor: "black",
                              }
                            : { borderWidth: 0 }
                        }
                      />
                    );
                  })}
              </div>
              <div className="Offer-product_image">
                {/* We handle offers created before the possibility of uploading multi-images */}
                {offer.product_image[0] ? (
                  <img
                    src={offer.product_image[image].secure_url}
                    alt="Product"
                  />
                ) : (
                  <img src={offer.product_image.secure_url} alt="Product" />
                )}
              </div>
            </div>

            <div className="Offer-product_info">
              <div className="Product-price">{offer.product_price} €</div>
              {offer.product_details.map((item) => {
                let objectKeys = Object.keys(item);
                return (
                  <div className="Offer-product_details">
                    <p>{objectKeys[0]}</p>
                    <p>{item[objectKeys[0]].toUpperCase()}</p>
                  </div>
                );
              })}
              <div className="Product_presentation">
                <h2>{offer.product_name}</h2>
                <p>{offer.product_description}</p>
                <div className="Offer-user">
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="avatar"
                  />
                  <p>{offer.owner.account.username}</p>
                </div>
                <div className="Offer-buy-button">
                  {Cookies.get("userToken") ? (
                    <Link
                      to={{
                        pathname: "/payment",
                        state: {
                          offer_id: id,
                          offer: offer,
                        },
                      }}
                    >
                      Acheter
                    </Link>
                  ) : (
                    <p
                      onClick={() => {
                        const newModal = { ...modal };
                        newModal.loginModal = !modal.loginModal;
                        newModal.openingPage = id;
                        setModal(newModal);
                      }}
                    >
                      Merci de vous connecter pour acheter
                    </p>
                  )}
                </div>
              </div>
            </div>
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

export default Offer;
