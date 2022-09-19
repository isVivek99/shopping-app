// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace prod {
  export const prodConfig = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: 'https://shopping-app-beryl.vercel.app/',
    MONGODB_URI: process.env.MONGODB_URI,
  };
}
