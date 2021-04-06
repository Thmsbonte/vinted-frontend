import "./HeaderSearchBar.scss";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderSearchBar = ({ setFilters, filters, fetchData }) => {
  return (
    <div className="Header-search-bar">
      <div className="Select-header">
        <p>Articles</p>
        {/* <select name="Select-button" id="Select-header">
                  <option value="">Article</option>
                  <option value="Article 1">Article 1</option>
                  <option value="Article 2">Article 2</option>
                  <option value="Article 3">Article 3</option>
                  <option value="Article 4">Article 4</option>
                  <option value="Article 5">Article 5</option>
                  <option value="Article 6">Article 6</option>
                </select> */}
      </div>
      <i>
        <FontAwesomeIcon icon="search" />
      </i>
      <input
        type="text"
        name="search-bar"
        className="Search-bar"
        placeholder="Rechercher des articles"
        // Send new data request for each new value entered in search bar. Debounce function to send a new request every 500ms maximum.
        onChange={debounce((event) => {
          const newFilters = { ...filters };
          newFilters.title = event.target.value;
          setFilters(newFilters);
          fetchData(
            newFilters.title,
            filters.priceMin,
            filters.priceMax,
            filters.sort,
            filters.skip,
            filters.limit
          );
        }, 500)}
      />
    </div>
  );
};

export default HeaderSearchBar;
