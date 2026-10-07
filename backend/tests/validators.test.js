const { validateCredentials } = require("../src/validators/authValidators");

describe("validateCredentials", () => {
  const v = validateCredentials;
  test("mail invalide", () => {
    const result = v({ email: "test", password: "password123" });
    expect(result.error).toBe("Email invalide");
  });
});

describe("validateCredentials", () => {
    const v = validateCredentials;
    test("mot de passe trop court", () => {
      const result = v({ email: "test@example.com", password: "1214" });
      expect(result.error).toBe("Mot de passe : 8 caractères minimum");
    });
});