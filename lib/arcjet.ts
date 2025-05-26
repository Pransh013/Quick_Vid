import { env } from "@/env/server";
import arcjet from "@arcjet/next";

const aj = arcjet({
  key: env.ARCJET_API_KEY,
  rules: [],
});

export default aj;
