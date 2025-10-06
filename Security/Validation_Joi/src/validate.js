const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().message({
    "string.base": "Username phải là chuỗi",
    "string.empty": "Username không được rỗng",
    "string.min": "Username phải có ít nhất 3 ký tự",
  }),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  age: Joi.number().min(18).max(60).optional(),
});

const data = {
  username: "tuan",
  email: "tuan@example.com",
  password: "abc123",
  age: 20,
};

const { error, value } = userSchema.validate(data);

if (error) console.log("Lỗi :", error.details[0].message);
else console.log("✅ Dữ liệu hợp lệ:", value);