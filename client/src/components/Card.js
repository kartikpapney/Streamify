import React from "react";
import { Link } from "react-router-dom";
const Card = ({ props }) => {
  const { text, title, ImgLink, _id } = props
  return (
    <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 p-2">
      <div className="card">
        <img src={ImgLink} alt={text} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title text-light fw-normal">{title}</h6>
          <Link to={`${process.env.REACT_APP_FE_HOST}/watch/${_id}`}>
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
