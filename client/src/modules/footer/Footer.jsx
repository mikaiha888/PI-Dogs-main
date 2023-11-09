import style from "./Footer.module.css";

import ButtonList from "../../components/button-list/ButtonList";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <ul>
          <ButtonList link="http://localhost:5173/home" buttonName="Home" />
          <ButtonList link="http://localhost:5173/home" buttonName="Dogs!" />
          <ButtonList link="http://localhost:5173/home" buttonName="About us" />
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
