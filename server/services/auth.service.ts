import _ from 'lodash';
import { User, validateUser } from '../models';
import { responseObject } from '../helpers';

interface credProps {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

const signUp = async ({
  fName,
  lName,
  email,
  password,
}: credProps): Promise<responseObject> => {};
