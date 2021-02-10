import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faQuestion,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faQuestion, faHeart);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/offer">
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
