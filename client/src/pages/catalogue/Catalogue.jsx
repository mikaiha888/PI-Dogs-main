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
    e.target.value !== "Seleccionar filtro" &&
      dispatch(filterCards(e.target.value));
  };

  const handleOrder = (e) => {
    e.target.value !== "Seleccionar orden" &&
      dispatch(orderCards(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);

  return (
    <main className={style.catalogue}>
      <h2>Catálogo</h2>
      <SearchBar />
      <Pagination
        handlePage={handlePageChange}
        current={currentPage}
        total={totalPages}
      />
      <div className={style.selectorContainer}>
        <Selector
          name={"filtro"}
          options={temperaments}
          handleChange={handleFilter}
        />
        <Selector
          name={"orden"}
          options={["a-z", "z-a"]}
          handleChange={handleOrder}
        />
      </div>
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
