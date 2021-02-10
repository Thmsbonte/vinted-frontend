import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <div className="Header container">
      <div className="Header-logo">
        <img src="../assets/img/Vinted_logo.png" alt="Vinted-logo" />
      </div>
      <div className="Header-search">
        <select
          name="Select-header"
          id="Select-header"
          placeholder="Article"
        ></select>
        <FontAwesomeIcon icon="search" />
        <input
          type="text"
          name="search-bar"
          className="Search-bar"
          id="search-bar"
          placeholder="Rechercher des articles"
        />
      </div>
      <div className="Header-right">
        <button>S'inscrire/Se connecter</button>
        <button>Vends tes articles</button>
        <FontAwesomeIcon icon="question" />
        <select name="language" id="language" placeholder="FR"></select>
      </div>
    </div>
  );
};

export default Header;
