import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions";
import validation from "./validation";

const Form = () => {
  const dispatch = useDispatch();
  const { temperaments } = useSelector((state) => state);
  const [errors, setErrors] = useState({});
  const [focusedFields, setFocusedFields] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [breedData, setBreedData] = useState({
    name: "",
    image: "",
    height: { min: "", max: "" },
    weight: { min: "", max: "" },
    life_span: { min: "", max: "" },
    temperament: [],
  });

  const fieldsToShowInputs = ["name", "image"];
  const fieldsToShowInputsMinMax = ["height", "weight", "life_span"];

  const handleChangeText = (e) => {
    const { name, value } = e.target;
    setBreedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFocusedFields((prevFields) => ({
      ...prevFields,
      [name]: true,
    }));
  };

  const handleChangeMinMax = (e) => {
    const { name, value } = e.target;
    const [field, prop] = name.split("_m");
    setBreedData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [prop]: value,
      },
    }));
    setFocusedFields((prevFields) => ({
      ...prevFields,
      [field]: true,
    }));
  };

  const handleCheckboxChange = (e) => {
    const temperamentAlreadySelected = selectedTemperaments.indexOf(
      e.target.value
    );
    if (temperamentAlreadySelected !== -1) {
      setSelectedTemperaments(
        selectedTemperaments.filter(
          (temperaments) => temperaments !== e.target.value
        )
      );
      setBreedData((prevData) => ({
        ...prevData,
        temperament: [
          ...prevData.temperament.filter(
            (temperament) => temperament !== e.target.value
          ),
        ],
      }));
    }
    if (temperamentAlreadySelected === -1) {
      setSelectedTemperaments((prevState) => [...prevState, e.target.value]);
      setBreedData((prevData) => ({
        ...prevData,
        temperament: [...prevData.temperament, e.target.value],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createDog({
        ...breedData,
        image: "public/img/dogGuide-bg.jpg",
        temperament: [...breedData["temperament"]].join(", "),
        height: {
          min: parseInt(breedData["height"]["min"]),
          max: parseInt(breedData["height"]["max"]),
        },
        weight: {
          min: parseInt(breedData["weight"]["min"]),
          max: parseInt(breedData["weight"]["max"]),
        },
        life_span: {
          min: parseInt(breedData["life_span"]["min"]),
          max: parseInt(breedData["life_span"]["max"]),
        }
      })
    );
    setFocusedFields({});
    setSelectedTemperaments([]);
    setBreedData({
      name: "",
      image: "",
      height: { min: "", max: "" },
      weight: { min: "", max: "" },
      life_span: { min: "", max: "" },
      temperament: "",
    });
  };

  const handleFocus = (name) => {
    setFocusedFields({ ...focusedFields, [name]: true });
  };

  useEffect(() => {
    !temperaments.length && dispatch(getAllTemperaments());
    if (Object.values(focusedFields).some((isFocused) => isFocused)) {
      const breedValidated = validation(breedData);
      setErrors(breedValidated);
      const hasErrors = Object.keys(breedValidated).some(
        (key) => breedData.hasOwnProperty(key) && breedValidated[key] !== ""
      );
      setFormIsValid(!hasErrors);
    }
  }, [breedData, focusedFields]);

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.formContainer}>
          {fieldsToShowInputs.map((key) => (
            <div key={key}>
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
              </label>
              <br />
              <input
                type="text"
                name={key}
                value={breedData[key]}
                onChange={handleChangeText}
                onFocus={() => handleFocus(key)}
              />
              {focusedFields[key] && errors[key] && (
                <p>{focusedFields[key] && errors[key]}</p>
              )}
            </div>
          ))}
          {fieldsToShowInputsMinMax.map((key) => (
            <div key={key}>
              <label htmlFor="">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <br />
              <input
                type="text"
                placeholder={"Min"}
                onChange={(e) => handleChangeMinMax(e)}
                onFocus={() => handleFocus(key)}
                name={`${key}_mmin`}
                value={breedData[key].min}
              />
              <input
                type="text"
                placeholder={"Max"}
                onChange={(e) => handleChangeMinMax(e)}
                onFocus={() => handleFocus(key)}
                name={`${key}_mmax`}
                value={breedData[key].max}
              />
              {focusedFields[key] && errors[key] && (
                <p>{focusedFields[key] && errors[key]}</p>
              )}
            </div>
          ))}
          <div>
            {temperaments.map((temperament) => (
              <label key={temperament}>
                <input
                  type="checkbox"
                  value={temperament}
                  checked={selectedTemperaments.includes(temperament)}
                  onChange={(e) => handleCheckboxChange(e)}
                  onFocus={() => handleFocus("temperament")}
                />
                {temperament}
              </label>
            ))}
            {focusedFields["temperament"] && errors["temperament"] && (
              <p>{focusedFields["temperament"] && errors["temperament"]}</p>
            )}
          </div>
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
