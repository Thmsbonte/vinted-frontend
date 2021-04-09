import "./HeaderSearchBar.scss";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderSearchBar = ({ setFilters, filters, fetchData }) => {
  return (
    <div className="Header-search-bar">
      <div className="Select-header">
        <p>Articles</p>
      </div>
      <i>
        <FontAwesomeIcon icon="search" />
      </i>
      <input
        type="text"
        name="search-bar"
        className="Search-bar"
        placeholder="Rechercher des articles"
        // Send new data request for each new value entered in search bar. Debounce function to send a new request every 400ms maximum.
        onChange={debounce((event) => {
          fetchData(
            event.target.value,
            filters.priceMin,
            filters.priceMax,
            filters.sort,
            filters.skip,
            filters.limit
          );
          const newFilters = { ...filters };
          newFilters.title = event.target.value;
          setFilters(newFilters);
        }, 400)}
      />
    </div>
  );
};

export default HeaderSearchBar;
