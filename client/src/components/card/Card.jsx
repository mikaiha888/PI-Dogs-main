import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ id, name, image, weight, temperament }) => {
  return (
    <div>
      <Link to={`/dogs/${id}`}>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{temperament}</p>
        <p>{weight}</p>
      </Link>
    </div>
  );
};
export default Card;
