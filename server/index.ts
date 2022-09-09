import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth, categorySubTopicList } from './routes';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/freshness',
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

app.listen(process.env.PORT || 4011, () => {
  console.log(`app listening at http://localhost:${process.env.PORT || 4011}`);
});
