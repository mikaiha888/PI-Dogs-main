const ButtonList = ({ link, buttonName }) => {
  return (
    <li>
      <a href={link}>{buttonName}</a>
    </li>
  );
};
export default ButtonList;
