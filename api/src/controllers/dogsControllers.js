const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const {
  fetchBreedsFromAPI,
  enrichBreedWithImages,
  findMatchingDbBreeds,
  removeDuplicates,
  fetchBreedByIdFromAPI,
  fetchBreedByIdFromDB,
  createDogInDatabase,
  findOrCreateTemperament,
  associateTemperamentWithDog,
} = require("./utils/index");

const imageExtensions = [".jpg", ".png"];

const getAllDogsController = async () => {
  try {
    const apiBreeds = await fetchBreedsFromAPI();
    const dbBreeds = await Dog.findAll({
      include: [{ model: Temperament, as: "temperaments" }],
    });
    const enrichedApiBreeds = await Promise.all(
      apiBreeds.map((breed) => enrichBreedWithImages(breed, imageExtensions))
    );
    const matchingBreeds = removeDuplicates([
      ...enrichedApiBreeds,
      ...dbBreeds,
    ]);
    return matchingBreeds;
  } catch (error) {
    throw error;
  }
};

const getBreedByIdController = async (id, source) => {
  try {
    let breed;
    if (source === "api") {
      breed = await fetchBreedByIdFromAPI(id);
      breed = await enrichBreedWithImages(breed, imageExtensions);
    } else if (source === "db") {
      breed = await fetchBreedByIdFromDB(id);
    }
    if (!breed) {
      throw new Error(`No se pudo encontrar la raza con el id ${id}`);
    }
    return breed;
  } catch (error) {
    throw error;
  }
};

const getDogByNameController = async (name) => {
  try {
    const apiBreeds = await fetchBreedsFromAPI();
    const dbBreeds = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [{ model: Temperament, as: "temperaments" }],
    });
    const enrichedApiBreeds = await Promise.all(
      apiBreeds
        .filter((breed) => breed.name.toLowerCase().includes(name))
        .map((breed) => enrichBreedWithImages(breed, imageExtensions))
    );
    const matchingDbBreeds = findMatchingDbBreeds(enrichedApiBreeds, dbBreeds);
    const matchingBreeds = removeDuplicates([
      ...enrichedApiBreeds,
      ...matchingDbBreeds,
    ]);

    if (matchingBreeds.length === 0) {
      throw new Error(`No se encontraron razas de perros con ese nombre.`);
    }
    return matchingBreeds;
  } catch (error) {
    throw error;
  }
};

const createDogController = async (newDogData) => {
  try {
    const newDog = await createDogInDatabase(newDogData);
    if (newDogData.temperament) {
      const newTemperament = await findOrCreateTemperament(
        newDogData.temperament
      );
      await associateTemperamentWithDog(newDog, newTemperament);
      return [newDog, newTemperament];
    }
    return [newDog, null];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDogsController,
  getBreedByIdController,
  getDogByNameController,
  createDogController,
};
