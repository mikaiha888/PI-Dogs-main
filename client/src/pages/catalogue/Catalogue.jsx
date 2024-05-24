import style from "./Catalogue.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCards,
  getAllBreeds,
  orderCards,
  handleWeight,
  getAllTemperaments,
  filterCardsByDbOrApi,
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

  const totalPages = Math.ceil(catalogue.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageReset = () => {
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    if (e.target.name === "Filter") {
      dispatch(filterCardsByDbOrApi(e.target.value));
      handlePageReset();
    } else {
      dispatch(filterCards(e.target.value));
      handlePageReset();
    }
  };

  const handleOrder = (e) => {
    if (e.target.value.includes("-")) {
      dispatch(orderCards(e.target.value));
      handlePageReset();
    } else {
      dispatch(handleWeight(e.target.value));
      handlePageReset();
    }
  };

  useEffect(() => {
    dispatch(getAllBreeds());
    dispatch(getAllTemperaments());
  }, []);

  return (
    <main className={style.catalogue}>
      <div className={style.searchbarContainer}>
        <h2>Catálogo</h2>
        <SearchBar handlePage={handlePageReset} />
        <div className={style.selectorContainer}>
          <Selector
            name={"Filter"}
            text={"Seleccionar filtro"}
            options={["Base de datos", "Api"]}
            handleChange={handleFilter}
            disabled={!catalogue.length}
          />
          <Selector
            name={"temperamentFilter"}
            text={"Seleccionar temperamento"}
            options={temperaments}
            handleChange={handleFilter}
            disabled={!catalogue.length}
          />
          <Selector
            name={"alphabeticalOrder"}
            text={"Ordenar por abecedario"}
            options={["a-z", "z-a"]}
            handleChange={handleOrder}
            disabled={!catalogue.length}
          />
          <Selector
            name={"weightOrder"}
            text={"Ordenar por peso"}
            options={["Mas liviano", "Mas pesado"]}
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
