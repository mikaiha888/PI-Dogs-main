const isValidImageUrl = (url) => {
  return url.toLowerCase().endsWith(".jpg");
};

const validation = (breedData) => {
  let errors = {};
  if (!breedData.name.trim()) {
    errors.name = "*El nombre es obligatorio";
  } else if (!/^[A-Za-z]+$/.test(breedData.name)) {
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
  }

  if (!breedData.weight.trim()) {
    errors.weight = "*El peso es obligatorio";
  }

  if (!breedData.life_span.trim()) {
    errors.life_span = "*La esperanza de vida es obligatoria";
  }

  if (!breedData.temperament.trim()) {
    errors.temperament = "*El temperamento es obligatorio";
  } else if (!/^[A-Za-z]+$/.test(breedData.name)) {
    errors.name = "*Debe contener solo letras";
  }

  return errors;
};

export default validation;
