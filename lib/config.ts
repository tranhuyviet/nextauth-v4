const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://nextauth-v4.vercel.app/api"
    : "http://localhost:3000/api";

export { apiUrl };
