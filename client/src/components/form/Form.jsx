import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createDog } from "../../redux/actions";
import validation from "./validation";

import Input from "../input/Input";

const Form = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
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
    setBreedData({ ...breedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDog({...breedData, image: 'public/img/dogGuide-bg.jpg'}));
    setBreedData({
      name: "",
      image: "",
      height: "",
      weight: "",
      life_span: "",
      temperament: "",
    });
  };

  useEffect(() => {
    if (
      breedData.name !== "" ||
      breedData.image !== "" ||
      breedData.height !== "" ||
      breedData.weight !== "" ||
      breedData.life_span !== "" ||
      breedData.temperament !== ""
    ) {
      setErrors(validation(breedData));
      if (
        errors.name ||
        errors.image ||
        errors.height ||
        errors.weight ||
        errors.life_span ||
        errors.temperament
      ) {
        setFormIsValid(false);
      } else {
        setFormIsValid(true);
      }
    }
  }, [breedData]);

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.formContainer}>
          <Input
            label={"Name"}
            name={"name"}
            type={"text"}
            value={breedData.name}
            handleChange={handleChange}
            errors={errors.name}
          />
          <Input
            label={"Image"}
            name={"image"}
            type={"text"}
            value={breedData.image}
            handleChange={handleChange}
            errors={errors.image}
          />
          <Input
            label={"Height"}
            name={"height"}
            type={"text"}
            value={breedData.height}
            handleChange={handleChange}
            errors={errors.height}
          />
          <Input
            label={"Weight"}
            name={"weight"}
            type={"text"}
            value={breedData.weight}
            handleChange={handleChange}
            errors={errors.weight}
          />
          <Input
            label={"Life span"}
            name={"life_span"}
            type={"text"}
            value={breedData.life_span}
            handleChange={handleChange}
            errors={errors.life_span}
          />
          <Input
            label={"Temperament"}
            name={"temperament"}
            type={"text"}
            value={breedData.temperament}
            handleChange={handleChange}
            errors={errors.temperament}
          />
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
