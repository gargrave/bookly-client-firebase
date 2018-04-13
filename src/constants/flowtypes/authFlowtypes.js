// @flow
export type LoginErrors = {
  found?: boolean,
  email: string,
  password: string,
};

export type LoginUser = {
  email: string,
  password: string,
};

export type RegisterErrors = {
  found?: boolean,
  email: string,
  password: string,
  passwordConfirm: string,
};

export type RegisterUser = {
  email: string,
  password: string,
  passwordConfirm: string,
};

export type User = {
  id?: string,
  registered?: Date | string,
  lastLogin?: Date | string,
  email: string,
  emailVerified?: boolean,
  password?: string,
};
