import style from "./Selector.module.css";

const Selector = ({ name, options, handleChange, disabled }) => {
  return (
    <select
      className={style.selector}
      key={name}
      name={name}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="seleccionar">{`Seleccionar ${name}`}</option>
      {options.map((option) => (
        <option option={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Selector;
