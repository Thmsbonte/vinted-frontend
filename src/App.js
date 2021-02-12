import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faQuestion,
  faHeart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faQuestion, faHeart, faTimes);

const App = () => {
  const [userInfo, setUserInfo] = useState("");
  const setUser = (token, username) => {
    if (token) {
      Cookies.set("userToken", token);
      Cookies.set("username", username);
      setUserInfo({ token: token, username: username });
    } else {
      Cookies.remove("userToken");
      Cookies.remove("username");
      setUserInfo("");
    }
  };

  useEffect(() => {
    setUser(Cookies.get("userToken"));
  }, []);

  return (
    <Router>
      <Header userInfo={userInfo} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
