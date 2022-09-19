// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace dev {
  export const devConfig = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
  };
}
