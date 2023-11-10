import style from "./Input.module.css";

const Input = ({ label, name, type, value, handleChange, handleFocus, errors }) => {
  return (
    <div className={style.input}>
      <label htmlFor={name}>{label}: </label>
      <br />
      <input type={type} name={name} value={value} onChange={handleChange} onFocus={handleFocus} />
      {errors && <p>{errors}</p>}
    </div>
  );
};

export default Input;
