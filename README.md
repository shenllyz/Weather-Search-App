# Weather Search Application

This project is a web application that allows users to search for weather information using the Tomorrow.io API and display the results on the same page. Users can provide location information either by entering a street address, city, and state, or by detecting their current location. The application includes dynamic validation, a progress bar, error handling, and a favorites tab. The weather details can also be shared on Twitter.

## Technologies Used

- **Frontend:**
  - React
  - Bootstrap
  - MUI (Material-UI)
  - HighCharts

- **Backend:**
  - Express
  - MongoDB Atlas

- **APIs:**
  - Tomorrow.io API
  - Google Maps API
  - Google Geocoding & Places API
  - IPinfo API
  - Twitter (X) API

- **Cloud:**
  - Google Cloud Platform (GCP)
 
## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account
- Google Cloud Platform account
- Tomorrow.io account
- IPinfo account
- Twitter Developer account

### Installation

1. Clone the repository:

```sh
git clone https://github.com/shenllyz/weather-search-app.git
cd weather-search-app
```
2. Install dependencies for both frontend and backend:
```sh
cd backend
npm install axios cors dotenv express mongodb
cd ../frontend
npm install @emotion/react @emotion/styled @mui/icons-material @mui/material @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/highcharts @types/jest @types/node @types/react @types/react-dom @vis.gl/react-google-maps bootstrap bootstrap-icons dotenv highcharts highcharts-react-official react react-bootstrap react-dom react-scripts react-transition-group sass typescript web-vitals
```
3. Set up environment variables:<br>
   Create a .env file in both backend and frontend directories with the following content:<br>
   backend/.env:
```sh
TOMORROW_API_KEY=your_tomorrow_api_key
IPINFO_TOKEN=your_ipinfo_token
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
FRONTEND_URL=your_frontend_url
```
frontend/.env:
```sh
REACT_APP_BACKEND_URL=your_backend_url
```
### Running the Application
1. Start the backend server:
   
```sh
cd backend/src
node server.js
```
2. Start the frontend development server:  
```sh
cd frontend
npm run build
npm start
```
 3. Open your browser and navigate to `http://localhost:3000`.

### Deployment

#### Backend Deployment on GCP

1. Ensure you have the Google Cloud SDK installed and authenticated.
2. Deploy the backend to Google App Engine:

    ```sh
    cd backend
    gcloud app deploy
    ```

#### Frontend Deployment

1. Build the frontend for production:

    ```sh
    cd frontend
    npm run build
    ```

2. Deploy the build folder to your preferred hosting service (e.g., Firebase, Netlify, Vercel).

## Features

- **Weather Search:** Search for weather information by entering a street address, city, and state, or by detecting the user's current location.
- **Dynamic Validation:** Real-time validation of form inputs.
- **Progress Bar:** Indicates background processing during API calls.
- **Error Handling:** Displays appropriate error messages for invalid API responses.
- **Favorites Tab:** Add and remove favorite cities.
- **Twitter Sharing:** Share weather details on Twitter.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Tomorrow.io](https://www.tomorrow.io/)
- [Google Maps API](https://developers.google.com/maps)
- [IPinfo](https://ipinfo.io/)
- [HighCharts](https://www.highcharts.com/)
- [Twitter Developer](https://developer.twitter.com/)

