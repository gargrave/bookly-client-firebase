// @flow
export type Profile = {
  id?: string,
  created?: Date | string,
  firstName: string,
  lastName: string,
  updated?: Date | string,
};

export type ProfileErrors = {
  firstName: string,
  lastName: string,
};
