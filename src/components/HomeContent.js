import "./HomeContent.scss";
import HomeOffer from "./HomeOffer";

const HomeContent = ({ offers }) => {
  return (
    <div className="Home-content container">
      {/* Display home page offers */}
      {offers.map((item) => {
        return <HomeOffer offer={item} key={item.id} />;
      })}
    </div>
  );
};

export default HomeContent;
