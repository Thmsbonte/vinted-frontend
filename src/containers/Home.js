import "./Home.scss";
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";
import ResponsiveMenu from "../components/ResponsiveMenu";
import Footer from "../components/Footer";

const Home = ({
  isLoading,
  offers,
  setOffers,
  errorMessage,
  responsiveMenu,
  setResponsiveMenu,
  userInfo,
  setUser,
  modal,
  setModal,
}) => {
  // Display loading or error message from fetchData() App containers
  return isLoading ? (
    <p className="Is-loading">En cours de chargement </p>
  ) : errorMessage ? (
    <p className="Error-message">{errorMessage} </p>
  ) : !responsiveMenu ? (
    <>
      <div className="Home">
        <Hero />
        <HomeContent offers={offers} setOffers={setOffers} />
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

export default Home;
