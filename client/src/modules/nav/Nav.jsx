import ButtonList from "../../components/button-list/ButtonList";
import SearchBar from "../../components/searchbar/SearchBar";

const Nav = () => {
  return (
    <nav>
      <SearchBar />
      <ul>
        <ButtonList link="/home" buttonName="Home" />
        <ButtonList link="/profile" buttonName="Profile" />
        <ButtonList link="/" buttonName="Log Out" />
      </ul>
    </nav>
  );
};
export default Nav;