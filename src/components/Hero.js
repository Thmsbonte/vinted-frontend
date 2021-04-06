import "./Hero.scss";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="Hero-background ">
        <div className="Hero container">
          <div className="Hero-content">
            <h1>Prêt à faire du tri dans vos placards ?</h1>
            <button>Commencez à vendre</button>
            <Link to="#" className="link">
              Découvrir comment ça marche
            </Link>
          </div>
        </div>
      </div>
      <div className="Responsive">
        <div className="Hero-content-responsive">
          <h1>Prêt à faire du tri dans vos placards ?</h1>
          <button>Commencez à vendre</button>
          <Link to="#" className="link">
            Découvrir comment ça marche
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
