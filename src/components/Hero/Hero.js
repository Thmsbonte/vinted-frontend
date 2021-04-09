import "./Hero.scss";
import { Link } from "react-router-dom";

const Hero = ({ userInfo, modal, setModal }) => {
  return (
    <>
      <div className="Hero-background ">
        <div className="Hero container">
          <div className="Hero-content">
            <h1>Prêt à faire du tri dans vos placards ?</h1>
            {userInfo.token ? (
              <Link to="/offer/publish" className="Button-sell">
                Commencer à vendre
              </Link>
            ) : (
              <Link
                to="#"
                className="Button-sell"
                onClick={() => {
                  const newModal = { ...modal };
                  newModal.loginModal = !modal.loginModal;
                  newModal.openingPage = "publish";
                  setModal(newModal);
                }}
              >
                Commencer à vendre
              </Link>
            )}
            <Link to="/about" className="link">
              Découvrir comment ça marche
            </Link>
          </div>
        </div>
      </div>
      <div className="Responsive">
        <div className="Hero-content-responsive">
          <h1>Prêt à faire du tri dans vos placards ?</h1>
          {userInfo.token ? (
            <Link to="/offer/publish" className="Button-sell">
              Commencer à vendre
            </Link>
          ) : (
            <Link
              to="#"
              className="Button-sell"
              onClick={() => {
                const newModal = { ...modal };
                newModal.loginModal = !modal.loginModal;
                newModal.openingPage = "publish";
                setModal(newModal);
              }}
            >
              Commencer à vendre
            </Link>
          )}
          <Link to="/about" className="link">
            Découvrir comment ça marche
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
