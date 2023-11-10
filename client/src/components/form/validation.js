const isValidImageUrl = (url) => {
  return url.toLowerCase().endsWith(".jpg");
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

  if (!breedData.height.trim()) {
    errors.height = "*La altura es obligatoria";
  } else if (breedData.height.length > 10) {
    errors.height = "*Debe tener menos de 10 caracteres";
  }

  if (!breedData.weight.trim()) {
    errors.weight = "*El peso es obligatorio";
  } else if (breedData.weight.length > 10) {
    errors.weight = "*Debe tener menos de 10 caracteres";
  }

  if (!breedData.life_span.trim()) {
    errors.life_span = "*La esperanza de vida es obligatoria";
  } else if (breedData.life_span.length > 20) {
    errors.life_span = "*Debe tener menos de 20 caracteres";
  }

  if (!breedData.temperament.trim()) {
    errors.temperament = "*El temperamento es obligatorio";
  } else if (!/^[a-zA-Z\s]+$/.test(breedData.temperament)) {
    errors.temperament = "*Debe contener solo letras";
  } else if (breedData.temperament.length > 50) {
    errors.temperament = "*Límite de caracteres excedido";
  }

  return errors;
};

export default validation;
