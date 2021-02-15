import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = ({ setUser, modal, setModal }) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const newCredentials = { ...credentials };
    newCredentials[event.target.id] = event.target.value;
    setCredentials(newCredentials);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingMessage(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-backend.herokuapp.com/user/login",
        credentials
      );
      setUser(response.data.token, response.data.account.username);
      setLoadingMessage(false);
      // If the user comes from the "sell article" button, we redirect him to the publish page
      if (modal.openingPage === "publish") {
        const newModal = { ...modal };
        newModal.loginModal = !modal.loginModal;
        newModal.openingPage = "";
        setModal(newModal);
        history.push("/offer/publish");
        // Else redirection to home page
      } else {
        const newModal = { ...modal };
        newModal.loginModal = !modal.loginModal;
        setModal(newModal);
        history.push("/");
      }
    } catch (error) {
      console.log(error.response);
      setLoadingMessage(false);
      setErrorMessage(error.response.data.message);
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
