import axios from 'axios';

interface UserPayload {
  email: string;
  fName: string;
  lName: string;
  password: string;
}
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
    url: 'http://localhost:4011/api/login',
    headers: headerObject,
    data: body,
  });
}

export function requestAddUser(UserPayloadObject: any) {
  const body = UserPayloadObject;
  const headerObject = {
    'Content-type': 'application/json',
  };
  return axios.request({
    method: 'post',
    url: 'http://localhost:4011/api/register',
    headers: headerObject,
    data: body,
  });
}
