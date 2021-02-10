import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_header from "../assets/img/vinted.png";

const Header = () => {
  return (
    <div className="Header container">
      <div className="Header-left">
        <div className="Header-logo">
          <img src={logo_header} alt="Vinted-logo" />
        </div>
        <div className="Header-search">
          <div className="Select-header">
            <select name="Select-button" id="Select-header">
              <option value="">Article</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </select>
          </div>
          <i>
            <FontAwesomeIcon icon="search" />
          </i>
          <input
            type="text"
            name="search-bar"
            className="Search-bar"
            id="search-bar"
            placeholder="Rechercher des articles"
          />
        </div>
      </div>
      <div className="Header-right">
        <button className="Button-signup-login">S'inscrire/Se connecter</button>
        <button className="Button-sell">Vends tes articles</button>
        <i>
          <FontAwesomeIcon icon="question" />
        </i>
        <select name="language" id="language" placeholder="FR">
          <option value="">FR</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
