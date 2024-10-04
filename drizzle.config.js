/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://carListingDb_owner:Lmrx9Kh5nROD@ep-weathered-dew-a5bnvp2n.us-east-2.aws.neon.tech/carListingDb?sslmode=require",
  },
};
