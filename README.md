# 🌍 Coronavirus (COVID-19) Live Stats Tracker

This project is a React-based web application to track the live stats of COVID-19. It utilizes disease.sh's API to fetch global and country-wise stats, and visualizes them using Material-UI components and the Leaflet Map library.

- [Click here to view the project](https://covid-19-tracker-ea291.web.app/)

## Features:

- 🌐 Country Selector: Choose any country from the dropdown or select "Worldwide" to get statistics for the entire world.
- 📈 Live Statistics: Displays the most recent statistics for cases, recoveries, and deaths.
- 🗺 Interactive Map: Visualizes the spread of the virus. Zoom in to see the number of cases in specific regions.
- 📊 Historical Data Line Chart: Uses the react-chartjs-2 library to provide a line chart displaying the trend of cases, recoveries, or deaths over the past 120 days.
- 📄 Data Table: Lists all countries along with their total cases.
- 📱 Responsive Design: Ensures the app looks good on all devices, from mobile to desktop.

## Libraries & Frameworks

- ReactJS: The primary framework used for building the application.
- Material-UI: A popular React UI framework for styling and layout.
- Leaflet: A leading open-source JavaScript library used for mobile-friendly interactive maps.
- react-chartjs-2: A React wrapper for Chart.js 2.

## Setup an Run

- Clone this repository.
- Setup Firebase(See below (For free Firebase hosting(deploy))
- Install Dependencies.
- After setup Firebase and installed Dependencies, you can run application

### Firebase (if you want to deploy/host it)

- Visit [console](https://console.firebase.google.com)
- Create Project. (Project name can be anything.)

## Dependencies

- [Firebase](https://firebase.google.com/docs)
- [React-leaflet](https://react-leaflet.js.org/docs/start-installation) (2.7.0) !
- [Leaflet](https://leafletjs.com/) (1.6.0) !
- [Chart.js](https://www.chartjs.org/docs/latest//)

Made with :heart: by Valid

- [Click here to view project](https://covid-19-tracker-ea291.web.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
