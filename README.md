# Chingu Note App

This is a note taking web app that was build as a solo project to apply to join Chingu (https://github.com/chingu-voyages)


## Features

### Authentication
The Chingu note app has authentication set up for users to sign in, sign up, or retreive their forgotten passwords.

### Notes
Once logged in, users can create notes with a title and a body. The user can edit or delete these notes in the future. The bottom of each note will tell when the note was last edited.


## Run Chingu Note App

### Clone this repository

Clone this repository locally.
Run npm install in your terminal, if you don't have npm.

### Set Up A Firebase Project
Chingu Note App uses Firebase authentication and Realtime Database (I am using Firebase hosting as well for the demo, but you are free to host it anywhere).

Create a firebase project for the web.
Create a .env file in the root folder where you downloaded the project.
Copy the configurations of your firebase project to the .env file in the appropriate place.

```
REACT_APP_FIREBASE_KEY=
REACT_APP_FIREBASE_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_SENDER_ID=
```

Run npm start to launch it in localhost.


## Dependecies

- React
- React DOM
- React Router
- React Router Dom
- Firebase 
