// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mistermellow.dk",
  redirects: {
    "/kollektion": "/shop",
  },
});
