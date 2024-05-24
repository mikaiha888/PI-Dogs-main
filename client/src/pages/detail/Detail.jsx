import style from "./Detail.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";

import ButtonNormal from "../../components/button-normal/ButtonNormal";

const Detail = () => {
  const { id } = useParams();
  const { breed } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  return (
    <div className={style.detail}>
      <img src={breed.image} alt={breed.name} />
      <div>
        <h3>{breed.name}</h3>
        <p>{breed.name}</p>
        <p>
          {breed.height?.max
            ? `${breed.height?.min} - ${breed.height?.max} cm`
            : `${breed.height?.min} cm`}
        </p>
        <p>{breed.weight?.max
            ? `${breed.weight?.min} - ${breed.weight?.max} kg`
            : `${breed.weight?.min} kg`}</p>
        <p>
          {breed.life_span?.max
            ? `${breed.life_span?.min} - ${breed.life_span?.max} years`
            : `${breed.life_span?.min} years`}
        </p>
      </div>
      <ButtonNormal link={"/dogs"} buttonName={"Back"} />
    </div>
  );
};
export default Detail;
