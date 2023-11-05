import ButtonList from "../../components/button-list/ButtonList";
import SearchBar from "../../components/searchbar/SearchBar";

const Nav = () => {
  return (
    <nav>
      <SearchBar />
      <ul>
        <ButtonList link="/home" buttonName="Home" />
        <ButtonList link="/dogs" buttonName="Dogs!" />
        <ButtonList link="/" buttonName="Log Out" />
      </ul>
    </nav>
  );
};
export default Nav;