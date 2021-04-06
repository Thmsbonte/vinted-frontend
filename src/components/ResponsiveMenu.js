import "./ResponsiveMenu.scss";
import { Link, useHistory } from "react-router-dom";

const ResponsiveMenu = ({
  userInfo,
  setUser,
  modal,
  setModal,
  setResponsiveMenu,
}) => {
  const history = useHistory();
  return (
    <div className="container Responsive-menu">
      {/* If user connected display of a logout button with his username*/}
      {userInfo.token ? (
        <button
          className="Button-logout"
          onClick={() => {
            setUser(null);
            setResponsiveMenu(false);
            history.push("/");
          }}
        >
          <p>
            Bonjour <strong>{userInfo.username}</strong>
          </p>
          <span>Se déconnecter</span>
        </button>
      ) : (
        // If user not connected diplay of the login button
        <Link
          onClick={() => {
            const newModal = { ...modal };
            newModal.loginModal = !modal.loginModal;
            setModal(newModal);
          }}
          className="Button-login"
        >
          Se connecter
        </Link>
      )}
      {/* If user connected, redirection to the publish page, else redirection to the login page*/}
      {userInfo.token ? (
        <Link
          to="/offer/publish"
          className="Button-sell"
          onClick={() => setResponsiveMenu(false)}
        >
          Vends tes articles
        </Link>
      ) : (
        <Link
          to="#"
          className="Button-sell"
          onClick={() => {
            const newModal = { ...modal };
            newModal.loginModal = !modal.loginModal;
            newModal.openingPage = "publish";
            setModal(newModal);
          }}
        >
          Vends tes articles
        </Link>
      )}
    </div>
  );
};

export default ResponsiveMenu;
