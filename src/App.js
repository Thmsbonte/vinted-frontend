import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Offer from "./containers/Offer/Offer";
import Home from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Publish from "./containers/Publish/Publish";
import Payment from "./containers/Payment/Payment";
import About from "./containers/About/About";
import MyOffers from "./containers/MyOffers/MyOffers";
import UpdateOffer from "./containers/UpdateOffer/UpdateOffer";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import {
  faSearch,
  faQuestion,
  faHeart,
  faTimes,
  faTimesCircle,
  faArrowsAltV,
  faPlus,
  faCross,
  faBars,
  faChevronCircleRight,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faQuestion,
  faHeart,
  faTimes,
  faArrowsAltV,
  faPlus,
  faCross,
  faTimesCircle,
  faBars,
  faChevronCircleRight,
  faSortUp,
  faSortDown
);

const App = () => {
  // State declaration
  const [userInfo, setUserInfo] = useState({
    token: "",
    username: "",
    user_id: "",
  });
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
  const [modal, setModal] = useState({
    loginModal: false,
    signupModal: false,
    openingPage: "",
  });
  const [responsiveMenu, setResponsiveMenu] = useState(false);

  // Function : creation of user's cookies
  const setUser = (token, username, user_id) => {
    if (token) {
      Cookies.set("userToken", token);
      Cookies.set("username", username);
      Cookies.set("user_id", user_id);
      setUserInfo({ token: token, username: username, user_id: user_id });
    } else {
      Cookies.remove("userToken");
      Cookies.remove("username");
      setUserInfo("");
    }
  };

  // Function : get offers' home page data according to header filters
  const fetchData = async (title, priceMin, priceMax, sort, skip, limit) => {
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
      url.substring(0, url.length - 1); // We delete the last character (? or &) that is useless
      const response = await axios.get(url); // Axios request with query parameters
      setOffers(response.data); // Save request response data
      setIsLoading(false); // Re-initialize loading state when request is done (success)
    } catch (error) {
      setErrorMessage(error.message); // Set an "error message" state to display to the user
      setIsLoading(false); // Re-initialize loading state when request is done (error)
    }
  };

  // At the opening of the App, and only once :
  useEffect(() => {
    fetchData(); // Get all offers data information
    Cookies.get("userToken") && // If a user token exist, update user's state information
      setUserInfo({
        token: Cookies.get("userToken"),
        username: Cookies.get("username"),
      });
  }, []);

  // JSX return
  return (
    <Router>
      <Header
        userInfo={userInfo}
        setUser={setUser}
        fetchData={fetchData}
        filters={filters}
        setFilters={setFilters}
        modal={modal}
        setModal={setModal}
        responsiveMenu={responsiveMenu}
        setResponsiveMenu={setResponsiveMenu}
      />
      <Switch>
        <Route path="/payment">
          <Payment
            modal={modal}
            setModal={setModal}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
            userInfo={userInfo}
            setUser={setUser}
          />
        </Route>
        <Route path="/offer/publish">
          <Publish
            modal={modal}
            setModal={setModal}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
            userInfo={userInfo}
            setUser={setUser}
          />
        </Route>
        <Route path="/offer/update/:id">
          <UpdateOffer
            modal={modal}
            setModal={setModal}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
            userInfo={userInfo}
            setUser={setUser}
          />
        </Route>
        <Route path="/offer/:id">
          <Offer
            modal={modal}
            setModal={setModal}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
            userInfo={userInfo}
            setUser={setUser}
          />
        </Route>
        <Route path="/my-offers">
          <MyOffers
            modal={modal}
            setModal={setModal}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
            userInfo={userInfo}
            setUser={setUser}
          />
        </Route>
        <Route path="/about">
          <About
            modal={modal}
            setModal={setModal}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
            userInfo={userInfo}
            setUser={setUser}
          />
        </Route>
        <Redirect from="/reload" to="/" />
        <Route path="/">
          <Home
            isLoading={isLoading}
            fetchData={fetchData}
            offers={offers}
            setOffers={setOffers}
            errorMessage={errorMessage}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
            userInfo={userInfo}
            setUser={setUser}
            modal={modal}
            setModal={setModal}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
