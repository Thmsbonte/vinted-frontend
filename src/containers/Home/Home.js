import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import HomeContent from "../../components/HomeContent/HomeContent";
import ResponsiveMenu from "../../components/ResponsiveMenu/ResponsiveMenu";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

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
      <div className="Home">
        <Hero userInfo={userInfo} modal={modal} setModal={setModal} />
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
