import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faQuestion,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Signup from "./containers/Signup";
library.add(faSearch, faQuestion, faHeart);

const App = () => {
  const [userToken, setUserToken] = useState("");
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken("");
    }
  };
  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
