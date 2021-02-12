import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_header from "../assets/img/vinted.png";
import { Link, useHistory } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const Header = ({ userInfo, setUser, fetchData, filters, setFilters }) => {
  const [modal, setModal] = useState({
    loginModal: false,
    signupModal: false,
  });
  const history = useHistory();
  return (
    <>
      {modal.loginModal && (
        <LoginModal modal={modal} setModal={setModal} setUser={setUser} />
      )}
      {modal.signupModal && (
        <SignupModal modal={modal} setModal={setModal} setUser={setUser} />
      )}
      <div className="Header container">
        <div className="Header-left">
          <div className="Header-logo">
            <img src={logo_header} alt="Vinted-logo" />
          </div>
          <div className="Header-search-block">
            <div className="Header-search-bar">
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
                value={filters.title}
                onChange={(event) => {
                  const newFilters = { ...filters };
                  newFilters.title = event.target.value;
                  setFilters(newFilters);
                  debounce(() => {
                    fetchData(
                      newFilters.title,
                      filters.priceMin,
                      filters.priceMax,
                      filters.sort,
                      filters.skip,
                      filters.limit
                    );
                  }, 1);
                }}
              />
            </div>
            <div className="Header-filter-block">
              <p>Trier par prix</p>
              <div
                className="Filter-sort"
                onClick={(event) => {
                  const newFilters = { ...filters };
                  newFilters.sort === "price-asc"
                    ? (newFilters.sort = "price-desc")
                    : (newFilters.sort = "price-asc");
                  setFilters(newFilters);
                  fetchData(
                    filters.title,
                    filters.priceMin,
                    filters.priceMax,
                    newFilters.sort,
                    filters.skip,
                    filters.limit
                  );
                }}
              >
                {/* {filters.sort==="price-asc" ? style={marginLeft : 0} : style={marginLeft : 0}} */}
                <i>
                  <FontAwesomeIcon icon="arrows-alt-v" size="sm" />
                </i>
              </div>
            </div>
          </div>
        </div>
        <div className="Header-right">
          {userInfo.token ? (
            <button
              className="Button-logout"
              onClick={() => {
                setUser(null);
                history.push("/");
              }}
            >
              <p>
                Bonjour <strong>{userInfo.username}</strong>
              </p>
              <span>Se déconnecter</span>
            </button>
          ) : (
            <Link
              onClick={() => {
                const newModal = { ...modal };
                newModal.loginModal = !modal.loginModal;
                setModal(newModal);
              }}
              className="Button-login"
            >
              Se connecter
            </Link>
          )}
          <Link to="#" className="Button-sell">
            Vends tes articles
          </Link>
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
    </>
  );
};

export default Header;
