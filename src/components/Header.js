import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_header from "../assets/img/vinted.png";
import { Link, useHistory } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useState } from "react";
import debounce from "lodash.debounce";
import LabeledTwoThumbs from "./Slider";

const Header = ({
  userInfo,
  setUser,
  fetchData,
  filters,
  setFilters,
  modal,
  setModal,
}) => {
  // UseHistory initialization
  const history = useHistory();

  return (
    <>
      {/* Display login and signup modal when necessary */}
      {modal.loginModal && (
        <LoginModal modal={modal} setModal={setModal} setUser={setUser} />
      )}
      {modal.signupModal && (
        <SignupModal modal={modal} setModal={setModal} setUser={setUser} />
      )}
      <div className="Header container">
        <div className="Header-left">
          <Link to="/">
            <div className="Header-logo">
              <img src={logo_header} alt="Vinted-logo" />
            </div>
          </Link>
          <div className="Header-search-block">
            <div className="Header-search-bar">
              <div className="Select-header">
                <select name="Select-button" id="Select-header">
                  <option value="">Article</option>
                  <option value="Article 1">Article 1</option>
                  <option value="Article 2">Article 2</option>
                  <option value="Article 3">Article 3</option>
                  <option value="Article 4">Article 4</option>
                  <option value="Article 5">Article 5</option>
                  <option value="Article 6">Article 6</option>
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
                // Send new data request for each new value entered in search bar. Debounce function to send a new request every 500ms maximum.
                onChange={debounce((event) => {
                  const newFilters = { ...filters };
                  newFilters.title = event.target.value;
                  setFilters(newFilters);
                  fetchData(
                    newFilters.title,
                    filters.priceMin,
                    filters.priceMax,
                    filters.sort,
                    filters.skip,
                    filters.limit
                  );
                }, 500)}
              />
            </div>
            <div className="Header-filter-block">
              <p>Trier par prix</p>
              <div
                className="Filter-sort"
                // Send new data request with sorted parameter updated
                onClick={() => {
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
                <i
                  style={
                    filters.sort === "price-asc"
                      ? { marginLeft: 0 }
                      : { marginLeft: 25 }
                  }
                >
                  <FontAwesomeIcon icon="arrows-alt-v" size="sm" />
                </i>
              </div>
              <p>Prix entre : </p>
              <div className="Filter-price">
                {/* Price-min price-max filter slider component */}
                <LabeledTwoThumbs
                  STEP={5}
                  MIN={0}
                  MAX={500}
                  filters={filters}
                  setFilters={setFilters}
                  fetchData={fetchData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Header-right">
          {/* If user connected display of a logout button with his username*/}
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
            // If user not connected diplay of the login button
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
          {/* If user connected, redirection to the publish page, else redirection to the login page*/}
          {userInfo.token ? (
            <Link to="/offer/publish" className="Button-sell">
              Vends tes articles
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
              Vends tes articles
            </Link>
          )}
          <i>
            <FontAwesomeIcon icon="question" />
          </i>
          <select name="language" id="language" placeholder="FR">
            <option value="">FR</option>
            <option value="ENG">ENG</option>
            <option value="ESP">ESP</option>
            <option value="DUT">DUT</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Header;
