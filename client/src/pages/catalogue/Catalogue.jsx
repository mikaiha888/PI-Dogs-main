import { useDispatch } from "react-redux";
import { getAllBreeds } from "../../redux/actions";

import Cards from "../../components/cards/Cards";

const Catalogue = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBreeds());
  }, []);

  return (
    <div>
      <Cards />
    </div>
  );
};
export default Catalogue;
