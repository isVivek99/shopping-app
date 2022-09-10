import { Schema, Model, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// & interfaces
interface IRefreshToken {
  _id: string;
  token: string;
  expiryDate: Date;
  user: string;
}

interface IRefreshTokenMethods {
  verifyExpiration: (token: any) => string;
  createToken: (user: any) => object;
}

type RefreshTokenModel = Model<
  IRefreshToken,
  Record<string, never>,
  IRefreshTokenMethods
>;

//& Schema
const RefreshTokenSchema = new Schema({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'freshnessUsers',
  },
  expiryDate: Date,
});
//& methods
RefreshTokenSchema.statics.createToken = async function (user: any) {
  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + 86400);
  const _token = uuidv4();
  const _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expireDate.getTime(),
  });

  const refreshToken = await _object.save();

  return refreshToken;
};

RefreshTokenSchema.methods.verifyExpiration = (tokenData: any) => {
  return tokenData.expiryDate.getTime() < new Date().getTime();
};

//& Model
const RefreshToken = model<IRefreshToken, RefreshTokenModel>(
  'RefreshToken',
  RefreshTokenSchema
);

export { RefreshToken, IRefreshToken };
