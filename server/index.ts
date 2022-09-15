import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { auth, categorySubTopicList } from './routes';
import { newConfig } from './config/keys';

const app = express();
app.use(express.json());
// const allowedDomains = [
//   'https://shopping-app-git-main-vickydonor-99.vercel.app',
//   'http://shopping-orjz6u640-vickydonor-99.vercel.app',
//   'https://https://shopping-app-git-main-vickydonor-99.vercel.app/',
// ];

app.use(
  cors({
    origin: 'https://shopping-app-beryl.vercel.app/',
  })
);
dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      newConfig.MONGODB_URI || 'mongodb://localhost:27017/freshness',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log('connected to database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDatabase();

app.use('/api/auth', auth);
app.use('/api/categorySubTopicList', categorySubTopicList);

// static files (build of frontend)
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}
console.log(newConfig.PORT);

app.listen(newConfig.PORT || 4011, () => {
  console.log(`app listening at http://localhost:${newConfig.PORT || 4011}`);
});
