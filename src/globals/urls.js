// @flow

// URLs for local routing (i.e. react-router)
export let localUrls = {
  about: '/about',

  // auth routes
  account: '/account',
  login: '/account/login',
  register: '/account/register',
  verify: '/account/verify',
  pwResetRequest: '/account/passwordreset',
  pwResetConfirm: '/account/passwordreset/confirm',

  // authors routes
  authorsList: '/authors',
  authorCreate: '/authors/new',
  authorDetail: '/authors/:id',

  // books routes
  booksList: '/books',
  bookCreate: '/books/new',
  bookDetail: '/books/:id',
};
