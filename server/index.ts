import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { auth, categorySubTopicList } from './routes';
import { newConfig } from './config/keys';
import { string } from 'joi';
import router from './routes/auth';

const app = express();
app.use(express.json());
app.use(cors());
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

const routes: string | Record<string, string> = 'routes';
const index: string | Record<string, string> = 'index.ts';
// all routes should go here
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use('/api', path.join(__dirname, routes, index));

// static files (build of frontend)
if (process.env.NODE_ENV == 'production') {
  app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(newConfig.PORT || 4011, () => {
  console.log(`app listening at http://localhost:${newConfig.PORT || 4011}`);
});
