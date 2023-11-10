const axios = require("axios");
const { Dog, Temperament } = require("../../db");

const URL = "https://api.thedogapi.com/v1/breeds?limit=20";
const URL_ID = "https://api.thedogapi.com/v1/breeds";
const URL_IMAGE = "https://cdn2.thedogapi.com/images";

const fetchBreedsFromAPI = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const enrichBreedWithImages = async (breed, imageExtensions) => {
  for (const extension of imageExtensions) {
    try {
      await axios.get(`${URL_IMAGE}/${breed.reference_image_id}${extension}`);
      breed.image = `${URL_IMAGE}/${breed.reference_image_id}${extension}`;
      break;
    } catch (error) {}
  }
  return breed;
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

const createDogInDatabase = async (newDogData) => {
  try {
    const [newDog, created] = await Dog.findOrCreate({
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
    return newDog;
  } catch (error) {
    throw error;
  }
};

const findOrCreateTemperament = async (temperamentName) => {
  try {
    const [newTemperament, created] = await Temperament.findOrCreate({
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

module.exports = {
  fetchBreedsFromAPI,
  enrichBreedWithImages,
  findMatchingDbBreeds,
  removeDuplicates,
  fetchBreedByIdFromAPI,
  fetchBreedByIdFromDB,
  createDogInDatabase,
  findOrCreateTemperament,
  associateTemperamentWithDog,
};
