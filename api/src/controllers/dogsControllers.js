const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const {
  fetchBreedsFromAPI,
  fetchBreedsFromDB,
  enrichBreedWithImages,
  splitAndParse,
  processBreed,
  fetchBreedByIdFromAPI,
  fetchBreedByIdFromDB,
  findMatchingDbBreeds,
  removeDuplicates,
  createDogInDatabase,
  findOrCreateTemperament,
  associateTemperamentWithDog,
} = require("./utils/index");

const imageExtensions = [".jpg", ".png"];

const getAllDogsController = async () => {
  try {
    const apiBreeds = await fetchBreedsFromAPI();
    const enrichedApiBreeds = await Promise.all(
      apiBreeds.map((breed) => enrichBreedWithImages(breed, imageExtensions))
    );
    const dbBreedInfo = await Promise.all(enrichedApiBreeds.map(processBreed));
    return dbBreedInfo;
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
      breed = await splitAndParse(breed);
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
        .map(async (breed) => {
          await enrichBreedWithImages(breed, imageExtensions);
          splitAndParse(breed);
          return breed;
        })
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

const filterDogController = async (filter) => {
  try {
    if (filter === 'db') {
      const dbResponse = await fetchBreedsFromDB();
      return dbResponse;
    } else {
      let apiResponse = await fetchBreedsFromAPI();
      apiResponse = apiResponse.map(async breed => {
        breed = await enrichBreedWithImages(breed, imageExtensions);
        breed = await splitAndParse(breed);
        return breed
      })
      return Promise.all(apiResponse);
    }
    
  } catch (error) {
    throw error;
  }
}

const createDogController = async (newDogData) => {
  try {
    const [newDog, newTemperament] = await createDogInDatabase(newDogData);
    await associateTemperamentWithDog(newDog, newTemperament);
    return {
      id: newDog.id,
      name: newDog.name,
      image: newDog.image,
      height: newDog.height,
      weight: newDog.weight,
      life_span: newDog.life_span,
      temperament: {
        id: newTemperament.id,
        name: newTemperament.name,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDogsController,
  getBreedByIdController,
  getDogByNameController,
  filterDogController,
  createDogController,
};
