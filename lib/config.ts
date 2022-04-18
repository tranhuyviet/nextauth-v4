const apiUrl =
  process.env.NODE_ENV === "production"
    ? (process.env.API_URL as string) + "/api"
    : "http://localhost:3000/api";

export { apiUrl };
