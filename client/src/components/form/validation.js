const isValidImageUrl = (url) => {
  return url.toLowerCase().endsWith(".jpg");
};

const isNumericValue = (value) => {
  return !isNaN(value);
};

const validation = (breedData) => {
  let errors = {};

  if (!breedData.name.trim()) {
    errors.name = "*El nombre es obligatorio";
  } else if (!/^[a-zA-Z\s]+$/.test(breedData.name)) {
    errors.name = "*Debe contener solo letras";
  }

  if (!breedData.image.trim()) {
    errors.image = "*La URL de la imagen es obligatoria";
  } else if (!isValidImageUrl(breedData.image)) {
    errors.image =
      "*La URL de la imagen no es válida o no tiene la extensión .jpg";
  }

  if (!breedData.height.min.trim() || !breedData.height.max.trim()) {
    errors.height = "*Los campos de altura son obligatorios";
  }  
  if (!isNumericValue(breedData.height.min) || !isNumericValue(breedData.height.max)) {
    errors.height = "*La altura debe ser un número válido";
  } else if (breedData.height.min.length > 3 || breedData.height.max.length > 3) {
    errors.height = "*No puede tener más de 3 dígitos";
  } else if (breedData.height.min && breedData.height.max && breedData.height.min > breedData.height.max) {
    errors.height = "*La altura mínima no puede ser mayor al máximo"
  }

  if (!breedData.weight.min.trim() || !breedData.weight.max.trim()) {
    errors.weight = "*Los campos de peso son obligatorios";
  } 
  if (!isNumericValue(breedData.weight.min) || !isNumericValue(breedData.weight.max)) {
    errors.weight = "*El peso debe ser un número válido";
  } else if (breedData.weight.min.length > 3 || breedData.weight.max.length > 3) {
    errors.weight = "*No puede tener más de 3 dígitos";
  } else if (breedData.weight.min && breedData.weight.max && breedData.weight.min > breedData.weight.max) {
    errors.weight = "*El peso mínimo no puede ser mayor al máximo"
  }

  if (!breedData.life_span.min.trim() || !breedData.life_span.max.trim()) {
    errors.life_span = "*Los campos de esperanza de vida son obligatorios";
  } 
  if (!isNumericValue(breedData.life_span.min) || !isNumericValue(breedData.life_span.max)) {
    errors.life_span = "*La esperanza de vida debe ser un número válido";
  } else if (breedData.life_span.min.length > 3 || breedData.life_span.max.length > 3) {
    errors.life_span = "*No puede tener más de 3 dígitos";
  } else if (breedData.life_span.min && breedData.life_span.max && breedData.life_span.min > breedData.life_span.max) {
    errors.life_span = "*El peso mínimo no puede ser mayor al máximo"
  }

  if (!breedData.temperament || breedData.temperament.length === 0) {
    errors.temperament = "*Selecciona al menos un temperamento";
  }

  return errors;
};

export default validation;
