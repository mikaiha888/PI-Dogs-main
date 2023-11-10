import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createDog } from "../../redux/actions";
import validation from "./validation";

import Input from "../input/Input";

const Form = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [focusedFields, setFocusedFields] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [breedData, setBreedData] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBreedData({ ...breedData, [name]: value });
    setFocusedFields({ ...focusedFields, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDog({ ...breedData, image: "public/img/dogGuide-bg.jpg" }));
    setFocusedFields({});
    setBreedData({
      name: "",
      image: "",
      height: "",
      weight: "",
      life_span: "",
      temperament: "",
    });
  };

  const handleFocus = (name) => {
    setFocusedFields({ ...focusedFields, [name]: true });
  };

  useEffect(() => {
    if (Object.values(focusedFields).some((isFocused) => isFocused)) {
      const breedValidated = validation(breedData);
      setErrors(breedValidated);
      const hasErrors = Object.values(breedValidated).some((error) => error !== "");
      setFormIsValid(!hasErrors);
    }
  }, [breedData, focusedFields]);

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.formContainer}>
          {Object.keys(breedData).map((key) => (
            <Input
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              type="text"
              value={breedData[key]}
              handleChange={handleChange}
              handleFocus={() => handleFocus(key)}
              errors={focusedFields[key] && errors[key]}
            />
          ))}
        </div>
        <br />
        <button type="submit" disabled={!formIsValid}>
          Registrar
        </button>
      </form>
    </div>
  );
};
export default Form;
