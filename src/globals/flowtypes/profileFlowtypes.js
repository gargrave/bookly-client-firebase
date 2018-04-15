// @flow
export type Profile = {
  id?: string,
  created?: Date | string,
  updated?: Date | string,
  firstName: string,
  lastName: string,
};

export type ProfileErrors = {
  firstName: string,
  lastName: string,
};
