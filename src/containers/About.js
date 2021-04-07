import Footer from "../components/Footer";
import "./About.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import github_screenshot from "../assets/img/github-screenshot.png";
import ResponsiveMenu from "../components/ResponsiveMenu";

const About = ({
  modal,
  setModal,
  userInfo,
  setUser,
  setResponsiveMenu,
  responsiveMenu,
}) => {
  return (
    <>
      {!responsiveMenu ? (
        <div className="About container">
          <div className="About-content">
            <h2>About</h2>
            <div className="About-information">
              <p>
                Version simplifiée du site{" "}
                <a
                  href="https://www.vinted.fr/"
                  target="_blank"
                  rel="noreferrer"
                >
                  vinted.fr{" "}
                </a>
                , réalisé en React. Contient les pages :
                <ul>
                  <li>
                    <i>
                      <FontAwesomeIcon icon="chevron-circle-right" size="sm" />
                    </i>

                    <p>Accueil</p>
                  </li>
                  <li>
                    <i>
                      <FontAwesomeIcon icon="chevron-circle-right" size="sm" />
                    </i>

                    <p>Publier un article</p>
                  </li>
                  <li>
                    <i>
                      <FontAwesomeIcon icon="chevron-circle-right" size="sm" />
                    </i>
                    <p>Détail d'un article</p>
                  </li>
                  <li>
                    <i>
                      <FontAwesomeIcon icon="chevron-circle-right" size="sm" />
                    </i>

                    <p>Paiement</p>
                  </li>
                  <li>
                    <i>
                      <FontAwesomeIcon icon="chevron-circle-right" size="sm" />
                    </i>

                    <p>About (cette page)</p>
                  </li>
                </ul>
              </p>
            </div>

            <div className="Github-links">
              <p>
                Le code source et les détails sur le stack utilisé sont
                disponibles sur le{" "}
                <a
                  href="https://github.com/Thmsbonte/vinted-frontend"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>{" "}
                du projet.
              </p>
            </div>
            <div className="Back-to-home">
              <Link to="/">Retour à la page d'accueil</Link>
            </div>
          </div>
          <div className="About-image">
            <img src={github_screenshot} alt="Vinted-logo" />
          </div>
        </div>
      ) : (
        <ResponsiveMenu
          userInfo={userInfo}
          setUser={setUser}
          setModal={setModal}
          modal={modal}
          setResponsiveMenu={setResponsiveMenu}
        />
      )}
      <Footer />
    </>
  );
};

export default About;
