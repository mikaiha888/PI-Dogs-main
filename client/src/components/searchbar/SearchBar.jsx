import style from './SearchBar.module.css';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreed } from "../../redux/actions";

const SearchBar = ({ handlePage }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    handlePage()
  };

  const handleSearch = () => {
    dispatch(searchBreed(query));
    handlePage()
  };

  const handleEnter = (e) => {
    if (e.keyCode == 13) dispatch(searchBreed(query));
  };

  return (
    <div className={style.searchbar}>
      <input type="search" onChange={handleChange} onKeyDown={handleEnter} />
      <button onClick={handleSearch}>
        <img src="../../../public/img/search-icon.png" alt="Search Icon" />
      </button>
    </div>
  );
};
export default SearchBar;
