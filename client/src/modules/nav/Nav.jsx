import style from "./Nav.module.css";
import { useLocation } from "react-router-dom";

import ButtonList from "../../components/button-list/ButtonList";

const Nav = () => {
  const { pathname } = useLocation();

  const handleStyle = () => {
    return pathname !== "/home" || pathname !== "/"
      ? { position: "" }
      : { position: "inherite"};
  };

  return (
    <nav className={style.nav} style={handleStyle()}>
      <ul>
        <ButtonList link="/home" buttonName="Home" />
        <ButtonList link="/dogs" buttonName="Dogs!" />
        <ButtonList link="/about-us" buttonName="About us" />
      </ul>
    </nav>
  );
};
export default Nav;
