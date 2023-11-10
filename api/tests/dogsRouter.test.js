const request = require("supertest");
const app = require("../src/app");

describe("Rutas tipo GET", () => {
  it('Deberia responder con un status 200 en la ruta "/"', async () => {
    const response = await request(app).get("/dogs");
    expect(response.statusCode).toBe(200);
  });

  it('Debería responder con un código de estado 200 en la ruta "/dogs/search"', async () => {
    const response = await request(app).get("/dogs/search").query({ name: "Akita" });
    expect(response.statusCode).toBe(200);
  });

  it('Debería responder con un código de estado 200 en la ruta "/dogs/:id"', async () => {
    const response = await request(app).get("/dogs/1");
    expect(response.statusCode).toBe(200);
  });

  it('Debería responder con un código de estado 200 en la ruta "/dogs"', async () => {
    const response = await request(app).get("/dogs");
    expect(response.statusCode).toBe(200);
  });
});

describe("Rutas tipo POST", () => {
  it('Debería responder con un código de estado 200 en la ruta "/dogs"', async () => {
    const response = await request(app).post("/dogs").send({
      name: "nuevoPerro",
      height: "12",
      weight: "12",
      image: "nuevoPerro.jpg",
      life_span: "12",
      temperament: "Feliz",
    });
    expect(response.statusCode).toBe(201);
  });
});
