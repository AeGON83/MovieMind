import { Fragment } from "react";
import loadingIcon from "../assets/icons/loading.svg";

export default function Loading() {
  return (
    <Fragment>
      <div className="loading">
        <div className="spinner">
          <img src={loadingIcon} className="fa-solid fa-spinner-third" />
        </div>
      </div>
    </Fragment>
  );
}
