import style from "./Card.module.css";

import ButtonNormal from "../button-normal/ButtonNormal";

const Card = ({ id, name, image, weight, temperament }) => {
  return (
    <div className={style.card}>
      <div className={style.cardContainer}>
        <img src={image} alt={name} />
      </div>
      <div className={style.infoContainer}>
        <h3>{name}</h3>
        <p>{temperament}</p>
        <p>{weight}</p>
        <ButtonNormal link={`/dogs/${id}`} buttonName={"Detail"} />
      </div>
    </div>
  );
};
export default Card;
