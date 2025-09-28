const request = require("supertest");
const app = require("../src/server");

describe("CRUD API /users", () => {
  it("GET /users should return array", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /users should create a user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Tuấn", email: "tuan@example.com" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Tuấn");
  });
  it("PUT /users update success", async () => {
    const res = await request(app)
      .put("/users/1")
      .send({ name: "Tuan Update", email: "tuandev180704@gmail.com" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Tuan Update");
    expect(res.body.email).toBe("tuandev180704@gmail.com");
  });
  it("DELETE /users/:id should delete a user", async () => {
    const res = await request(app).delete("/users/1"); 
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});
