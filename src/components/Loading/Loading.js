import "./Loading.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
  return (
    <div className="Loading">
      <Loader type="ThreeDots" color="#15aeb7" height={70} width={70} />
    </div>
  );
};

export default Loading;
