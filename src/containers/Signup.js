import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
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
      setUser(response.data);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Signup">
      <h1>S'inscrire</h1>
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Signup;
