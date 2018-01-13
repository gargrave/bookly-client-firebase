# Bookly Client (React + Firebase)

Yet another version of the frontend codebase for my `Bookly` app, again using React, but this time using Firebase Firestore for the backend rather than [my own HapiJS version](https://github.com/gargrave/bookly-server). (I know it's a crime against humanity for a frontend dev to use Firebase these days, but I do not have a great deal of extra dev time to work on my own projects, and maintaining both the frontend and backend is out of the question for me. You get _a lot_ of functionality for free when using Firebase, so that's where I have settled for now.)

The app itself is not particularly interesting, as my primary goal is to just have a simple ongoing app where I can try out new libraries and technologies, and just generally mess around and try new things.

## Points of Interest

Having a look around? Here are some fun things to look at!

- A nice, simple [Snackbar system](https://github.com/gargrave/bookly-client-firebase/tree/master/src/containers/common/Snackbar)

## Major TODOs

Some of the larger TODOs on my roadmap.

- Add an abstraction layer for API calls. Right now, this codebase is tightly coupled to Firebase, so if I decided to swap it out for a different backup, it would require significant rework.
- Add a better logging system, with custom font/colors/sizes for more clarity. I dump a lot to console, so it gets a little messy among all the other network calls and such.
- Remove the Shoelace CSS dependency fo basic CSS. _Most_ of my styles are implemented locally, but Shoelace is still being used for some really basic stuff like buttons and form elements.

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
