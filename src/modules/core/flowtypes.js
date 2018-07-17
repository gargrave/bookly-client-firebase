// @flow
export type ReactRoute = {
  component: Function,
  exact?: boolean,
  path?: string,
};

// TODO: move these to a wrappers file
export type FbDoc = {
  id: string,
  data: Function,
}

export type FbDocRef = {
  get: Function,
  update: Function,
};

export type FbCollection = {
  docs: FbDoc[],
};

export type FbError = {
  code: string,
  message: string,
};
