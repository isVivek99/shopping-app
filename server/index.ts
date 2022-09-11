import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { auth, categorySubTopicList } from './routes';
import { newConfig } from './config/keys';

const app = express();
app.use(express.json());
const allowedDomains = [
  'https://shopping-app-git-main-vickydonor-99.vercel.app',
  'http://shopping-orjz6u640-vickydonor-99.vercel.app',
  'https://https://shopping-app-git-main-vickydonor-99.vercel.app/',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
