import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = ({ setUser, modal, setModal }) => {
  // States and useHistory initialization
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // Alow to check if a string is a mongoDB valid id
  const mongoose = require("mongoose");
  const ObjectId = mongoose.Types.ObjectId;

  // Function : save all text inputs changes
  const handleInputChange = (event) => {
    const newCredentials = { ...credentials };
    newCredentials[event.target.id] = event.target.value;
    setCredentials(newCredentials);
  };

  // Function : handle form submit-> send login request with credential information to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Initialization of an error message state
    setLoadingMessage(true); // Display of a loading message

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-backend.herokuapp.com/user/login",
        credentials
      );
      setUser(
        response.data.token,
        response.data.account.username,
        response.data._id
      ); // Save user token and username information
      setLoadingMessage(false);
      // If the user comes from the "sell article" button, we redirect him to the publish page
      if (modal.openingPage === "publish") {
        const newModal = { ...modal };
        newModal.loginModal = !modal.loginModal;
        newModal.openingPage = "";
        setModal(newModal);
        history.push("/offer/publish");
        // If user comes from an offer page, redirection to the offer page
      } else if (ObjectId.isValid(modal.openingPage)) {
        const newModal = { ...modal };
        newModal.loginModal = !modal.loginModal;
        newModal.openingPage = "";
        setModal(newModal);
        history.push(`/offer/${modal.openingPage}`);
      } else {
        // Else redirection to home page
        const newModal = { ...modal };
        newModal.loginModal = !modal.loginModal;
        setModal(newModal);
        history.push("/");
      }
    } catch (error) {
      setLoadingMessage(false);
      setErrorMessage(error.response.data.message); // Set an "error message" to display to the user
    }
  };

  return (
    <div className="Modal">
      <div className="Modal-content">
        <div className="Modal-header">
          <i
            onClick={() => {
              const newModal = { ...modal };
              newModal.loginModal = !modal.loginModal;
              newModal.openingPage = "";
              setModal(newModal);
            }}
          >
            <FontAwesomeIcon icon="times" size="lg" />
          </i>
        </div>
        <h1>Se connecter</h1>
        {/* Display loading or error messages when needed */}
        {loadingMessage && (
          <p className="Login-error-message">{"Connexion en cours..."}</p>
        )}
        {errorMessage && <p className="Login-error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            value={credentials.password}
            onChange={handleInputChange}
          />
          <button type="submit">Se connecter</button>
        </form>
        {/* Link to the login page */}
        <Link
          onClick={() => {
            const newModal = { ...modal };
            newModal.loginModal = !modal.loginModal;
            newModal.signupModal = !modal.signupModal;
            setModal(newModal);
          }}
        >
          Pas encore de compte : je m'inscris !
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
