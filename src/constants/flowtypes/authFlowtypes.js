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

export type User = {
  id?: string,
  registered?: Date | string,
  lastLogin?: Date | string,
  email: string,
  password?: string,
};
