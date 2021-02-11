import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
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
      <Header />
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
