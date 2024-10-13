Here's a sample README file for your `movie-app-expo` project:

---

# Movie App (Expo)

This is a mobile application built using Expo and React Native. It allows users to browse and view movies. The app uses Expo Router for navigation, Axios for data fetching, and various other dependencies for smooth and responsive UI.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Scripts](#scripts)
- [Testing](#testing)
- [Linting](#linting)
- [Resetting the Project](#resetting-the-project)
- [Folder Structure](#folder-structure)

## Requirements

Make sure you have the following installed before proceeding:

- Node.js (>= 14.x.x)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio and/or Xcode for mobile development (optional)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/movie-app-expo.git
   cd movie-app-expo
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the App

### On Android:

```bash
npm run android
```

### On iOS:

```bash
npm run ios
```

### On Web:

```bash
npm run web
```

This will launch the Expo development environment in your browser, and the app will run on the desired platform.

## Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Runs the app on an Android emulator or connected device.
- `npm run ios`: Runs the app on an iOS simulator or connected device.
- `npm run web`: Runs the app in the browser.
- `npm run reset-project`: Resets the project by clearing caches and node_modules (custom script located in `scripts/reset-project.js`).
- `npm test`: Runs the Jest tests in watch mode.
- `npm run lint`: Runs ESLint for code linting.

## Testing

This project uses **Jest** for unit testing. To run the tests, use:

```bash
npm test
```

You can also run them in watch mode with the same command.

## Linting

To run the linter:

```bash
npm run lint
```

This will check your code for style issues and potential errors.

## Resetting the Project

If you encounter issues with the project, you can reset it using the following script:

```bash
npm run reset-project
```

This will clear the cache, reinstall dependencies, and ensure a clean state.

## Folder Structure

```
movie-app-expo/
├── app                     # root
├── assets/                 # Images, fonts, and other static assets
├── components/             # Reusable React Native components
├── services/               # Axios services for API calls
├── scripts/                # Utility scripts (like reset-project)
├── type                    # Type
├── type                    # Type
├── hooks                   # Hooks
├── package.json            # Project configurations and scripts
└── tsconfig.json           # TypeScript configuration
```

---

This README provides clear instructions for setup, running the app, testing, and linting. You can customize it further if necessary!
