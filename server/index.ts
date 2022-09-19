import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { auth, categorySubTopicList, productList } from './routes'
import { newConfig } from './config/keys'

const app = express()
app.use(express.json())

// app.use(
//   cors({
//     origin: `${
//       process.env.NODE_ENV === 'development'
//         ? 'http://localhost:3002/'
//         : 'https://shopping-app-beryl.vercel.app/'
//     }`,
//   }),
// )
app.use(cors())
dotenv.config()

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/freshness',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
    )
    console.log('connected to database')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
connectDatabase()

app.use('/api/auth', auth)
app.use('/api/categorySubTopicList', categorySubTopicList)
app.use('/api/productList', productList)

// static files (build of frontend)
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../client', 'build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}
console.log(process.env.PORT)

app.listen(process.env.PORT || 4011, () => {
  console.log(`app listening at http://localhost:${process.env.PORT || 4011}`)
})
