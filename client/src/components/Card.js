import React from "react";
import { Link } from "react-router-dom";
const Card = ({ props }) => {
  const { text, title, thumbnail, _id, link } = props
  return (
    <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 p-2 d-flex">
      <div className="card h-100">
        <img src={thumbnail} alt={text} className="card-img-top" />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-light fw-normal">{title}</h6>
          <Link to={link} target="_blank">
            <button
              rel="noreferrer"
              className="btn btn-sm btn-danger mt-2"
            >
              Watch Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
