const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchIpInfo = async () => {
  try {
    const ipTokenResponse = await fetch(`${BACKEND_URL}/get_IPlocation`);
    if (!ipTokenResponse.ok) {
      throw new Error(`Error fetching IP token: ${ipTokenResponse.status}`);
    }
    const ipTokenData = await ipTokenResponse.json();
    const ipToken = ipTokenData.token;
    const ipInfoUrl = `https://ipinfo.io/?token=${ipToken}`;

    const response = await fetch(ipInfoUrl);
    if (!response.ok) {
      throw new Error(`Error fetching IP Info data: ${response.status}`);
    }
    const data = await response.json();
    const loc = data.loc.split(',');
    const latitude = loc[0];
    const longitude = loc[1];
    const city = data.city;
    const state = data.region;
    
    console.log({ latitude, longitude, city, state});
    return { latitude, longitude, city, state};
  } catch (error) {
    console.error(error);
    throw error;  
  }
};


 

export const fetchGeocodingData = async (address: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/get_geocoding?address=${address}`);
    if (!response.ok) {
      throw new Error(`Error fetching Geocoding data: ${response.status}`);
    }
    const data = await response.json();
    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      const formattedAddress = data.results[0].formatted_address;
      console.log({ latitude, longitude, formattedAddress });
      return { latitude, longitude, formattedAddress };
    } else {
       
      throw new Error(`Geocoding API error: ${data.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;  
  }
};

  
  export const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const weatherUrl = `${BACKEND_URL}/get_weather?latitude=${lat}&longitude=${lon}`;
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.status}`);
      }
      const data = await response.json();
      if (data.data) {
        return data;
      } else {
        console.error('Weather API error:', data.error);
        throw new Error('Weather API error');
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };