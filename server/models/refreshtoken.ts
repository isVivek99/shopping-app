import { Schema, Model, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// & interfaces
interface IRefreshToken {
  tokem: string;
  expiryDate: Date;
}

interface IRefreshTokenMethods {
  verifyExpiration: (token: any) => string;
}

type RefreshTokenModel = Model<IRefreshToken, {}, IRefreshTokenMethods>;

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
  let expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + 86400);
  let _token = uuidv4();
  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expireDate.getTime(),
  });

  let refreshToken = await _object.save();

  return refreshToken;
};

RefreshTokenSchema.methods.verifyExpiration = (token: any) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

//& Model
const RefreshToken = model<IRefreshToken, RefreshTokenModel>(
  'RefreshToken',
  RefreshTokenSchema
);

export { RefreshToken, IRefreshToken };
