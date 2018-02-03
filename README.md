# Bookly Client (React + Firebase)

Yet another version of the frontend codebase for my `Bookly` app, again using React, but this time using Firebase Firestore for the backend rather than [my own HapiJS version](https://github.com/gargrave/bookly-server). (I know it's a crime against humanity for a frontend dev to use Firebase these days, but I do not have a great deal of extra dev time to work on my own projects, and maintaining both the frontend and backend is out of the question for me. You get _a lot_ of functionality for free when using Firebase, so that's where I have settled for now.)

The app itself is not particularly interesting, as my primary goal is to just have a simple ongoing app where I can try out new libraries and technologies, and just generally mess around and try new things.

---

## Config/Setup

### Git-ignored Config Files

These files are not included in the repo, but must be present for the application to work.

- `./src/secrets/firebaseConfig.js`: The config data from the console for this Firebase project (e.g. `apiKey`, `authDomain`, etc.). Simply have a `default export` of the config object in question.
  - Note that Firebase itself requires minimal setup, as the DB "tables" will be created on the fly as needed. You can set up validation rules to add better security, but I am not going to get into that process here.

---

## Other Versions

You can find some previous builds of this project here:

- [bookly-client-react](https://github.com/gargrave/bookly-client-react) - This is the version from which this project was cloned and diverged. It is still attached to the HapiJS backend, and while the core is identical to this version, its last commit was in December 2017, so it is pretty far behind at this point.
- [bookly-client-vue](https://github.com/gargrave/bookly-client-vue) - The original version, built with Quasar/Vue. I love working with Quasar/Vue, probably a bit more than React, but I moved on from this project for a number of a reasons once it reached a stable point.
