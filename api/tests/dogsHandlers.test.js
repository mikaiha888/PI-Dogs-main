const {
  getAllDogs,
  getBreedById,
  getDogByName,
  createDog,
} = require("../src/handlers/dogsHandlers");

jest.mock("../src/controllers/dogsControllers", () => ({
  getAllDogsController: jest.fn().mockResolvedValue([{ breed: "Dog" }]),
  getBreedByIdController: jest.fn().mockResolvedValue({ breed: "Dog" }),
  getDogByNameController: jest.fn().mockResolvedValue([{ breed: "Dog" }]),
  createDogController: jest.fn().mockResolvedValue({ breed: "Dog" }),
}));

describe("Handlers de dogsHandlers", () => {
  beforeEach(() => jest.clearAllMocks());

  it("getAllDogs debería llamar a getAllDogsController, y responder con un Array de Objetos y status 200", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllDogs(req, res);

    expect(Array.isArray(res.json.mock.calls[0][0])).toBe(true);
    expect(typeof res.json.mock.calls[0][0][0]).toBe("object");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getBreedById debería llamar a getBreedByIdController y responder con un objeto y status 200", async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getBreedById(req, res);

    expect(typeof res.json.mock.calls[0][0]).toBe("object");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getDogByName debería llamar a getDogByNameController y responder con un Array de Objetos y status 200", async () => {
    const req = {
      query: { name: "akita" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getDogByName(req, res);

    expect(Array.isArray(res.json.mock.calls[0][0])).toBe(true);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("createDog debería llamar a createDogController y responder con un objeto y status 201 si la raza se crea correctamente", async () => {
    const req = {
      body: {
        name: "New Dog",
        image: "dog.jpg",
        height: 50,
        weight: 25,
        life_span: "10-15 years",
        temperament: "Friendly",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createDog(req, res);

    expect(typeof res.json.mock.calls[0][0]).toBe("object");
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
