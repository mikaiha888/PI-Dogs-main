import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";


const Detail = () => {
  const { id } = useParams();
  const { breed } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(breed);

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
  
    return (
      <div>
        <img src={breed.image} alt={breed.name} />
        <h3>{breed.name}</h3>
        <p>{breed.temperament}</p>
        <p>{breed.height?.metric}</p>
        <p>{breed.weight?.metric}</p>
        <p>{breed.life_span}</p>
      </div>
    );
}
export default Detail