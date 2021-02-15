import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import {
  faSearch,
  faQuestion,
  faHeart,
  faTimes,
  faArrowsAltV,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Publish from "./containers/Publish";
library.add(faSearch, faQuestion, faHeart, faTimes, faArrowsAltV, faPlus);

const App = () => {
  // State declaration
  const [userInfo, setUserInfo] = useState({ token: "", username: "" });
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [filters, setFilters] = useState({
    title: "",
    priceMin: "",
    priceMax: "",
    sort: "",
    skip: "",
    limit: "",
  });

  // Function : creation of user's cookies
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

  // At the opening of the App, if a user token exist, update of user's information
  useEffect(() => {
    Cookies.get("userToken") &&
      setUserInfo({
        token: Cookies.get("userToken"),
        username: Cookies.get("username"),
      });
  }, []);

  // Function : get home page data according to header filters
  const fetchData = async (title, priceMin, priceMax, sort, skip, limit) => {
    console.log("Je fais une requête");
    try {
      let url = "https://lereacteur-vinted-backend.herokuapp.com/offers?";
      if (title) {
        url = `${url}title=${title}&`;
      }
      if (priceMin) {
        url = `${url}priceMin=${priceMin}&`;
      }
      if (priceMax) {
        url = `${url}priceMax=${priceMax}&`;
      }
      if (sort) {
        url = `${url}sort=${sort}&`;
      }
      if (skip) {
        url = `${url}skip=${skip}&`;
      }
      if (limit) {
        url = `${url}limit=${limit}&`;
      }
      url.substring(0, url.length - 1);
      const response = await axios.get(url);
      setOffers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  // JSX return
  return (
    <Router>
      <Header
        userInfo={userInfo}
        setUser={setUser}
        fetchData={fetchData}
        filters={filters}
        setFilters={setFilters}
      />
      <Switch>
        <Route path="/offer/publish">
          <Publish />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home
            isLoading={isLoading}
            fetchData={fetchData}
            offers={offers}
            setOffers={setOffers}
            errorMessage={errorMessage}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
