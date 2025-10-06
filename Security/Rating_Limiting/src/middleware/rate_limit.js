import rateLimit from "express-rate-limit";

export const globalLimited = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    status: 429,
    err: "Bạn đã gởi quá nhiều yêu cầu vui lòng thử lại sau ít phút",
  },
});

export const loginLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    status: 429,
    err: "Bạn đã login sai quá nhiều lần vui lòng thử lại sau 15p",
  },
});
