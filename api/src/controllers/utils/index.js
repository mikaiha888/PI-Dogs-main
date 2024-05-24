const axios = require("axios");
const { Dog, Temperament } = require("../../db");

const URL = "https://api.thedogapi.com/v1/breeds?limit=5";
const URL_ID = "https://api.thedogapi.com/v1/breeds";
const URL_IMAGE = "https://cdn2.thedogapi.com/images";

const fetchBreedsFromAPI = async () => {
  try {
    const breed = (await axios.get(URL)).data;
    return breed;
  } catch (error) {
    throw error;
  }
};

const fetchBreedsFromDB = async () => {
  try {
    const breed = await Dog.findAll({
      include: [{ model: Temperament, as: "temperaments" }],
    });
    return breed;
  } catch (error) {
    throw error;
  }
};

const enrichBreedWithImages = async (breed, imageExtensions) => {
  for (const extension of imageExtensions) {
    try {
      await axios.get(`${URL_IMAGE}/${breed.reference_image_id}${extension}`);
      breed.image = `${URL_IMAGE}/${breed.reference_image_id}${extension}`;
      return breed;
    } catch (error) {
      console.error(error);
    }
  }
  breed.image = "unknown";
  return breed;
};

const validateBreed = (breed) => {
  if (!breed.name) {
    console.warn(
      'Advertencia: El nombre es un campo obligatorio para la raza, cambiando a "unknown".'
    );
    breed.name = "unknown";
  }
  if (!breed.image) {
    console.warn(
      'Advertencia: La imagen es un campo obligatorio para la raza, cambiando a "unknown".'
    );
    breed.image = "unknown";
  }

  return true;
};

const splitAndParse = (breed) => {
  let properties = ["height", "weight", "life_span"];
  for (const prop of properties) {
    let parts;
    if (prop === "life_span" && breed[prop]) {
      parts = breed[prop].split(" ");
    } else if (breed[prop] && breed[prop].metric) {
      parts = breed[prop].metric.split(" - ");
    } else continue;
    let min = parseInt(parts[0]);
    let max = parseInt(parts[1]);
    isNaN(max)
      ? (breed[prop] = { min: min })
      : (breed[prop] = { min, max });
  }
  return { ...breed, temperament: { name: breed.temperament }};
};

const processBreed = async (breed) => {
  await validateBreed(breed);
  await splitAndParse(breed);
  const [dbBreed] = await Dog.findOrCreate({
    where: {
      name: breed.name,
      image: breed.image,
      height: breed.height,
      weight: breed.weight,
      life_span: breed.life_span,
    },
  });
  const [dbTemperament] = await Temperament.findOrCreate({
    where: { name: breed.temperament },
  });
  await associateTemperamentWithDog(dbBreed, dbTemperament);
  return {
    id: dbBreed.id,
    name: dbBreed.name,
    image: dbBreed.image,
    height: dbBreed.height,
    weight: dbBreed.weight,
    life_span: dbBreed.life_span,
    temperament: {
      id: dbTemperament.id,
      name: dbTemperament.name,
    },
  };
};

const fetchBreedByIdFromAPI = async (id) => {
  try {
    const response = await axios.get(`${URL_ID}/${id}`);

    const breed = response.data;
    return breed;
  } catch (error) {
    throw error;
  }
};

const fetchBreedByIdFromDB = async (id) => {
  try {
    const breed = await Dog.findByPk(id, {
      include: [{ model: Temperament, as: "temperaments" }],
    });
    if (!breed)
      throw new Error(
        `No se encontró ninguna raza de perro con el ID ${id} en la base de datos.`
      );
    return breed;
  } catch (error) {
    throw error;
  }
};

const findMatchingDbBreeds = (apiBreeds, dbBreeds) => {
  return apiBreeds.map((breed) => {
    const matchingDbBreed = dbBreeds.find(
      (dbBreed) => dbBreed.name === breed.name
    );
    if (matchingDbBreed) {
      breed.dbInfo = matchingDbBreed.image;
    }
    return breed;
  });
};

const removeDuplicates = (breeds) => {
  return breeds.filter((value, index, self) => {
    return self.findIndex((b) => b.name === value.name) === index;
  });
};

const createDogInDatabase = async (newDogData) => {
  try {
    if (newDogData.height.min === newDogData.height.max) {
      newDogData.height = { min: newDogData.height.min }
    }
    if (newDogData.weight.min === newDogData.weight.max) {
      newDogData.weight = { min: newDogData.weight.min }
    }
    if (newDogData.life_span.min === newDogData.life_span.max) {
      newDogData.life_span = { min: newDogData.life_span.min }
    }
    const [newDog] = await Dog.findOrCreate({
      where: {
        name: newDogData.name,
      },
      defaults: {
        image: newDogData.image,
        height: newDogData.height,
        weight: newDogData.weight,
        life_span: newDogData.life_span,
      },
    });
    const [newTemperament] = await Temperament.findOrCreate({
      where: {
        name: newDogData.temperament,
      },
    });
    return [newDog, newTemperament];
  } catch (error) {
    throw error;
  }
};

const findOrCreateTemperament = async (temperamentName) => {
  try {
    const [newTemperament] = await Temperament.findOrCreate({
      where: {
        name: temperamentName,
      },
    });
    return newTemperament;
  } catch (error) {
    throw error;
  }
};

const associateTemperamentWithDog = async (dog, temperament) => {
  try {
    await dog.addTemperament(temperament);
  } catch (error) {
    throw error;
  }
};

const getAllTemperamentsFromDb = async () => {
  try {
    const temperaments = await Temperament.findAll();
    return [
      ...new Set(
        temperaments.flatMap((temp) =>
          temp.name.split(", ").map((t) => t.trim())
        )
      ),
    ];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchBreedsFromAPI,
  fetchBreedsFromDB,
  enrichBreedWithImages,
  splitAndParse,
  processBreed,
  findMatchingDbBreeds,
  removeDuplicates,
  fetchBreedByIdFromAPI,
  fetchBreedByIdFromDB,
  createDogInDatabase,
  findOrCreateTemperament,
  associateTemperamentWithDog,
  getAllTemperamentsFromDb,
};
