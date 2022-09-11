import axios from 'axios';

interface UserLoginPayload {
  email: string;
  password: string;
}

export function requestGetUser(UserPayloadObject: UserLoginPayload) {
  const body = UserPayloadObject;
  const headerObject = {
    'Content-type': 'application/json',
  };
  return axios.request({
    method: 'post',
    url: 'https://shopping-app-beryl.vercel.app//api/auth/login',
    headers: headerObject,
    data: body,
  });
}

export function requestAddUser(UserPayloadObject: unknown) {
  const body = UserPayloadObject;
  const headerObject = {
    'Content-type': 'application/json',
  };
  return axios.request({
    method: 'post',
    url: 'https://shopping-app-beryl.vercel.app//api/auth/signup',
    headers: headerObject,
    data: body,
  });
}
