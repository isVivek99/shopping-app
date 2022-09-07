import { Schema, Model, model } from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// const User = new mongoose.Schema(
//   {
//     fName: { type: String, required: true },
//     lName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   {
//     collection: 'user-data',
//   }
// );
// const model = mongoose.model('UserData', User);

// module.exports = model;

//& interfaces

interface IUser {
  fName: string;
  lname: string;
  email: string;
  password: string;
}

interface IUserMethods {
  generateHash: () => string;
  validatePassword: (password: string) => boolean;
  generateToken: () => string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

//& Schema

const userSchema = new Schema({
  fName: { type: String, required: true, minlength: 3 },
  lName: { type: String, required: true, minlength: 3 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 25,
    match: /^\S+@\S+\.\S+$/,
  },
  password: { type: String, required: true, minlength: 6 },
});

//& hashing

userSchema.methods.generateHash = function (): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(this.password, salt);
};

userSchema.methods.validatePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password); // req.body.password, hashed password
};

//& token
userSchema.methods.generateToken = function (): string {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET || '',
    { expiresIn: '1h' }
  );
};

//& Model

const User = model<IUser, UserModel>('freshnessUser', userSchema);

//& Validation
const validateUser = (user: IUser): any => {
  const schema = Joi.object({
    fName: Joi.string().min(3).required(),
    lName: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).max(25).required(),
    password: Joi.string().min(3).max(25).required(),
  });
  return schema.validate(user);
};

export { User, validateUser, IUser };
