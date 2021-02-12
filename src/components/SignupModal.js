import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupModal = ({ setUser, modal, setModal }) => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    newsletter: false,
    avatar: "",
  });

  const handleInputChange = (event) => {
    const newCredentials = { ...credentials };
    newCredentials[event.target.id] = event.target.value;
    setCredentials(newCredentials);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-backend.herokuapp.com/user/signup",
        credentials
      );
      setUser(response.data.token, response.data.account.username);
      const newModal = { ...modal };
      newModal.signupModal = !modal.signupModal;
      setModal(newModal);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Modal">
      <div className="Modal-content">
        <div className="Modal-header">
          <i
            onClick={() => {
              const newModal = { ...modal };
              newModal.signupModal = !modal.signupModal;
              setModal(newModal);
            }}
          >
            <FontAwesomeIcon icon="times" size="lg" />
          </i>
        </div>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            value={credentials.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Téléphone"
            value={credentials.phone}
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
          <div className="Modal-newsletter">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              checked={credentials.newsletter}
              onChange={() => {
                const newCredentials = { ...credentials };
                newCredentials.newsletter = !newCredentials.newsletter;
                setCredentials(newCredentials);
              }}
            />
            <p>S'inscrire à notre newsletter</p>
          </div>
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
          Déjà un compte ? Je me connecte !
        </Link>
      </div>
    </div>
  );
};

export default SignupModal;
