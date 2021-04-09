import "./MyOffers.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ResponsiveMenu from "../../components/ResponsiveMenu/ResponsiveMenu";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MyOfferCard from "../../components/MyOfferCard/MyOfferCard";
import { Link } from "react-router-dom";

const MyOffers = ({
  modal,
  setModal,
  userInfo,
  setUser,
  responsiveMenu,
  setResponsiveMenu,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userOffers, setUserOffers] = useState([]);
  useEffect(() => {
    const fetchData = async (userId) => {
      if (userId) {
        try {
          const response = await axios.post(
            "https://lereacteur-vinted-backend.herokuapp.com/my-offers",
            {
              user_id: userId,
            }
          );
          setUserOffers(response.data);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(error.response?.data?.message);
          setIsLoading(false);
        }
      } else {
        setErrorMessage("Utilisateur non identifié");
        setIsLoading(false);
      }
    };
    fetchData(Cookies.get("user_id"));
  }, []);

  return isLoading ? (
    <>
      <div className="Is-loading">
        <p>En cours de chargement</p>
        <Loading />
      </div>
    </>
  ) : errorMessage ? (
    <p className="Error-message">{errorMessage} </p>
  ) : !responsiveMenu ? (
    <>
      <div className="My-offers">
        <div className="My-offers-main container">
          <p>{userOffers.length} article(s)</p>
          <div className="My-offers-content">
            {userOffers.length > 0 ? (
              userOffers.map((elem) => {
                return (
                  <MyOfferCard
                    offer={elem}
                    key={elem._id}
                    setErrorMessage={setErrorMessage}
                  />
                );
              })
            ) : (
              <div className="My-offers-no-offer">
                <p>Tu n'as pas encore mis d'article en ligne !</p>
                <Link to="/offer/publish">Vends tes articles</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <ResponsiveMenu
        userInfo={userInfo}
        setUser={setUser}
        setModal={setModal}
        modal={modal}
        setResponsiveMenu={setResponsiveMenu}
      />
      <Footer />
    </>
  );
};

export default MyOffers;
