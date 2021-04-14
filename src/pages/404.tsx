import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.error.scss";
import "@fontsource/open-sans";
import { track, tracking } from "../utils/tracking";
import { Link } from "gatsby";

const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found-page">
      <h1>404!</h1>
      <p>Opss!?! Keep calm and go to</p>
      <Link
        className="btn btn-default"
        onClick={() =>
          track(
            tracking.action.open_home,
            tracking.category.notfound,
            tracking.label.body
          )
        }
        to="/"
      >
        homepage
      </Link>
    </main>
  );
};

export default NotFoundPage;
