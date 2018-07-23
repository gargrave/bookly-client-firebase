// @flow
export type FbDoc = {
  id: string,
  data: Function,
  ref: any,
}

export type FbDocRef = {
  get: Function,
  delete: Function,
  set: Function,
  update: Function,
};

export type FbCollection = {
  docs: FbDoc[],
};

export type FbError = {
  code: string,
  message: string,
};
