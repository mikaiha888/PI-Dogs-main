import style from "./Selector.module.css";

const Selector = ({ name, text, options, handleChange, disabled }) => {
  return (
    <select
      className={style.selector}
      key={name}
      name={name}
      text={text}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="seleccionar">{text}</option>
      {options.map((option) => (
        <option option={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Selector;
