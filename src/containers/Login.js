import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const history = useHistory();
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
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-backend.herokuapp.com/user/login",
        credentials
      );
      setUser(response.data.token, response.data.account.username);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <h1>S'inscrire</h1>
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
      <Link to="/signup">Je m'inscris</Link>
    </div>
  );
};

export default Login;
