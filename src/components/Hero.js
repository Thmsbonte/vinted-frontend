import { Link } from "react-router-dom";

const Hero = () => {
  return (
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
  );
};

export default Hero;
