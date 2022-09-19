export module dev {
  // console.log(process.env.JWT_SECRET, process.env['NODE_ENV'])

  export const devConfig = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
  }
}
