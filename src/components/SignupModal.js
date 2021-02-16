import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupModal = ({ setUser, modal, setModal }) => {
  // States and useHistory initialization
  const history = useHistory();
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    newsletter: false,
    avatar: "",
  });

  // Function : save all text inputs changes
  const handleInputChange = (event) => {
    const newCredentials = { ...credentials };
    newCredentials[event.target.id] = event.target.value;
    setCredentials(newCredentials);
  };

  // Function : save user profile picture object
  const handleFileChange = (event) => {
    const newCredentials = { ...credentials };
    newCredentials.avatar = event.target.files[0];
    setCredentials(newCredentials);
  };

  // Function : handle form submit-> send new user sign-up data to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Initialization of an error message state
    setLoadingMessage(true); // Display of a loading message

    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("email", credentials.email);
    formData.append("phone", credentials.phone);
    formData.append("password", credentials.password);
    formData.append("newsletter", credentials.size);
    formData.append("avatar", credentials.avatar);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-backend.herokuapp.com/user/signup",
        formData
      );
      setUser(response.data.token, response.data.account.username); // Save user token and username information
      setLoadingMessage(false);

      // If user comes from the "sell article" button, we redirect him to the publish page
      if (modal.openingPage === "publish") {
        const newModal = { ...modal };
        newModal.signupModal = !modal.signupModal;
        newModal.openingPage = "";
        setModal(newModal);
        history.push("/offer/publish");

        // Else redirection to the home page
      } else {
        const newModal = { ...modal };
        newModal.signupModal = !modal.signupModal;
        setModal(newModal);
        history.push("/");
      }
    } catch (error) {
      setLoadingMessage(false);
      console.log(error);
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
              newModal.signupModal = !modal.signupModal;
              setModal(newModal);
            }}
          >
            <FontAwesomeIcon icon="times" size="lg" />
          </i>
        </div>
        <h1>Inscription</h1>
        {/* Display loading or error messages when needed */}
        {loadingMessage && (
          <p className="Login-error-message">
            {"Profil en cours de création ..."}
          </p>
        )}
        {errorMessage && <p className="Login-error-message">{errorMessage}</p>}
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
          <div className="Modal-avatar">
            <label for="avatar">Photo de profil</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleFileChange}
            />
          </div>
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
          <button type="submit">S'inscrire</button>
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
          Déjà un compte ? Je me connecte !
        </Link>
      </div>
    </div>
  );
};

export default SignupModal;
