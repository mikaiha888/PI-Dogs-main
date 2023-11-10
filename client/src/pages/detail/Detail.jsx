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
        <p>
          {breed.temperaments
            ? breed.temperaments[0]["name"]
            : breed.temperament}
        </p>
        <p>
          {breed.height?.metric
            ? `${breed.height.metric} kg`
            : `${breed.height} kg`}
        </p>
        <p>
          {breed.weight?.metric
            ? `${breed.weight.metric} kg`
            : `${breed.weight} kg`}
        </p>
        <p>{breed.life_span}</p>
      </div>
      <ButtonNormal link={"/dogs"} buttonName={"Back"} />
    </div>
  );
};
export default Detail;
