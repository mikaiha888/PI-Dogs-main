const {
  fetchBreedsFromAPI,
  findOrCreateTemperament,
  getAllTemperamentsFromDb,
} = require("./utils/index");

const getAllTempsControllers = async () => {
  try {
    const breeds = await fetchBreedsFromAPI();
    const allPromises = breeds.map(async (breed) => {
      breed.temperament && (await findOrCreateTemperament(breed.temperament));
    });
    await Promise.all(allPromises);
    const temperaments = await getAllTemperamentsFromDb();
    return temperaments;
  } catch (error) {
    throw error;
  }
};

const getTempController = async (name) => {
  try {
    const apiResponse = await fetchBreedsFromAPI();
    const apiTemperaments = apiResponse.filter(
      (temp) =>
        temp.temperament && temp.temperament.toLowerCase().includes(name)
    );
    const dbTemperaments = await getAllTemperamentsFromDb();
    const matchingTemperaments = [...apiTemperaments, ...dbTemperaments];
    if (matchingTemperaments.length === 0)
      throw new Error(`No se ha encontrado el temperamento.`);
    return matchingTemperaments;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTempsControllers,
  getTempController,
};
