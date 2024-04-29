export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
export const REDIS_URI = process.env.REDIS_URI || "redis://127.0.0.1:6379";
export const MONGODB_NAME = process.env.MONGODB_NAME || "e-commerce-app";
export const PORT = parseInt(process.env.PORT || 8080, 10);
