import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Tên phải ≥ 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  age: z.number().gte(18, "Tuổi ≥ 18").lte(60, "Tuổi ≤ 60").optional(),
});


const result = userSchema.safeParse({
  username: "tuandev",
  email: "tuan@example.com",
  password: "123456",
  age: 21,
});

if (!result.success) {
  console.log("❌ Lỗi:", result.error.errors);
} else {
  console.log("✅ Dữ liệu hợp lệ:", result.data);
}
