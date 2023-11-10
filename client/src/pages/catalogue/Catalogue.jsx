import style from "./Catalogue.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCards,
  getAllBreeds,
  getAllTemperaments,
  orderCards,
} from "../../redux/actions";

import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchbar/SearchBar";
import Selector from "../../components/selector/Selector";

const Catalogue = () => {
  const dispatch = useDispatch();
  const { temperaments, catalogue } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(getAllBreeds());
  }, []);

  const totalPages = Math.ceil(catalogue.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (e) => {
      dispatch(filterCards(e.target.value));
      setCurrentPage(1);
  };

  const handleOrder = (e) => {
      dispatch(orderCards(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);

  return (
    <main className={style.catalogue}>
      <div className={style.searchbarContainer}>
        <h2>Catálogo</h2>
        <SearchBar />
        <div className={style.selectorContainer} >
          <Selector
            name={"filtro"}
            options={temperaments}
            handleChange={handleFilter}
            disabled={!catalogue.length}
          />
          <Selector
            name={"orden"}
            options={["a-z", "z-a"]}
            handleChange={handleOrder}
            disabled={!catalogue.length}
          />
        </div>
      </div>
      <Pagination
        handlePage={handlePageChange}
        current={currentPage}
        total={totalPages}
      />
      <hr />
      <Cards
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        catalogue={catalogue}
      />
      <hr />
      <Pagination
        handlePage={handlePageChange}
        current={currentPage}
        total={totalPages}
      />
    </main>
  );
};
export default Catalogue;
