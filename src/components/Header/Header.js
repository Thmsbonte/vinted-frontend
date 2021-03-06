import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_header from "../../assets/img/vinted.png";
import { Link, useHistory } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../LoginModal/SignupModal";
import LabeledTwoThumbs from "../Slider/Slider";
import HeaderSearchBar from "../HeaderSearchBar/HeaderSearchBar";
import { useState } from "react";

const Header = ({
  userInfo,
  setUser,
  fetchData,
  filters,
  setFilters,
  modal,
  setModal,
  responsiveMenu,
  setResponsiveMenu,
}) => {

  const [headerMenu, setHeaderMenu] = useState(false); // Header dropdown menu
  const history = useHistory();

// Function : inverse asc/desc sort filter value and send new offer data request
  const handleAscDescPriceFilter = ()=>{
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
  }

  return (
    <>
      {/* Display login and signup modal when necessary */}
      {modal.loginModal && (
        <LoginModal
          modal={modal}
          setModal={setModal}
          setUser={setUser}
          setResponsiveMenu={setResponsiveMenu}
        />
      )}
      {modal.signupModal && (
        <SignupModal modal={modal} setModal={setModal} setUser={setUser} />
      )}
      <div className="container">
        <div className="Header">
          <div className="Header-left">
            <Link to="/">
              <div className="Header-logo">
                <img src={logo_header} alt="Vinted-logo" />
              </div>
            </Link>
            <div className="Header-search-block">
              <div className="Header-search-bar-content">
                <HeaderSearchBar
                  setFilters={setFilters}
                  filters={filters}
                  fetchData={fetchData}
                />
              </div>
              <div className="Header-filter-block">
                <p>Trier par prix</p>
                <div
                  className="Filter-sort"
                  // Send new data request with asc/desc sorted parameter updated
                  onClick={handleAscDescPriceFilter}
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
            {headerMenu && (
              <div className="Header-menu">
                <i>
                  <FontAwesomeIcon icon="sort-up" />
                </i>
                <p>Mon compte</p>
                <Link
                  to="/my-offers"
                  onClick={() => {
                    setHeaderMenu(!headerMenu);
                  }}
                >
                  Mes articles
                </Link>
                <button
                  className="Button-logout"
                  onClick={() => {
                    setHeaderMenu(!headerMenu);
                    setUser(null);
                    history.push("/");
                  }}
                >
                  Se déconnecter
                </button>
              </div>
            )}
            {/* If user connected display of a logout button with his username*/}
            {userInfo.token ? (
              <button
                className="Button-account"
                onClick={() => {
                  setHeaderMenu(!headerMenu);
                }}
              >
                <p>
                  Bonjour <strong>{userInfo.username}</strong>
                </p>
                <i>
                  <FontAwesomeIcon icon="sort-down" />
                </i>
              </button>
            ) : (
              // If user not connected diplay of the login button
              <Link
                to="#"
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
            <div className="About-link">
              <Link to="/about">
                <FontAwesomeIcon icon="question" />
              </Link>
            </div>

            <select name="language" id="language" placeholder="FR">
              <option value="">FR</option>
            </select>
          </div>
          <div
            className="Responsive-icon-menu"
            onClick={() => {
              setResponsiveMenu(!responsiveMenu);
            }}
          >
            {responsiveMenu ? (
              <FontAwesomeIcon icon="times" size="2x" />
            ) : (
              <FontAwesomeIcon icon="bars" size="2x" />
            )}
          </div>
        </div>
        <div className="Responsive-search-bar">
          <HeaderSearchBar
            setFilters={setFilters}
            filters={filters}
            fetchData={fetchData}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
