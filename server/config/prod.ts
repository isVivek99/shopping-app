export module prod {
  export const prodConfig = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
  };
}
