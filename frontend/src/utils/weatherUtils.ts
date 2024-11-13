export function getWeatherDescription(weatherCode: number): string {
    const weatherDescriptions: { [key: number]: string } = {
      0: "Unknown",
      1000: "Clear",
      1100: "Mostly Clear",
      1101: "Partly Cloudy",
      1102: "Mostly Cloudy",
      1001: "Cloudy",
      2000: "Fog",
      2100: "Light Fog",
      4000: "Drizzle",
      4001: "Rain",
      4200: "Light Rain",
      4201: "Heavy Rain",
      5000: "Snow",
      5001: "Flurries",
      5100: "Light Snow",
      5101: "Heavy Snow",
      6000: "Freezing Drizzle",
      6001: "Freezing Rain",
      6200: "Light Freezing Rain",
      6201: "Heavy Freezing Rain",
      7000: "Ice Pellets",
      7101: "Heavy Ice Pellets",
      7102: "Light Ice Pellets",
      8000: "Thunderstorm"
    };
  
    const description = weatherDescriptions[weatherCode];
    return description || "Unknown";
  }
  
  export function getWeatherIcon(weatherCode: number): string {
    const weatherIcons: { [key: number]: string } = {
      0: "Unknown",
      1000: '/Images/clear_day.svg',
      1100: "/Images/mostly_clear_day.svg",
      1101: "/Images/partly_cloudy_day.svg",
      1102: "/Images/mostly_cloudy.svg",
      1001: "/Images/cloudy.svg",
      2000: "/Images/fog.svg",
      2100: "/Images/fog_light.svg",
      4000: "/Images/drizzle.svg",
      4001: "/Images/rain.svg",
      4200: "/Images/rain_light.svg",
      4201: "/Images/rain_heavy.svg",
      5000: "/Images/snow.svg",
      5001: "/Images/flurries.svg",
      5100: "/Images/snow_light.svg",
      5101: "/Images/snow_heavy.svg",
      6000: "/Images/freezing_drizzle.svg",
      6001: "/Images/freezing_rain.svg",
      6200: "/Images/freezing_rain_light.svg",
      6201: "/Images/freezing_rain_heavy.svg",
      7000: "/Images/ice_pellets.svg",
      7101: "/Images/ice_pellets_heavy.svg",
      7102: "/Images/ice_pellets_light.svg",
      8000: "/Images/tstorm.svg"
    };
  
    return weatherIcons[weatherCode] || "Unknown";
  }
  interface ApiResponse {
    data: {
      timelines: {
        timestep: string;
        intervals: {
          startTime: string;
          values: any;
        }[];
      }[];
    };
  }
  
export interface DailyWeather {
    date: string;
    [key: string]: any;
  }
  
export interface HourlyWeather {
    startTime: string;
    [key: string]: any;
  }
  
  export function parseDailyWeather(apiResponse: ApiResponse): DailyWeather[] {
    const timelines = apiResponse.data.timelines;
    const dailyTimelines = timelines.filter(timeline => timeline.timestep === '1d');
  
    if (dailyTimelines.length > 0) {
      const dailyData: DailyWeather[] = [];
      dailyTimelines.forEach(dailyTimeline => {
        dailyTimeline.intervals.forEach(interval => {
          const entry: DailyWeather = {
            date: interval.startTime,
            ...interval.values
          };
          dailyData.push(entry);
        });
      });
      console.log(dailyData);
      return dailyData;
    } else {
      console.error('No daily timeline found in data');
      return [];
    }
  }
  
  export function parseHourlyWeather(apiResponse: ApiResponse): HourlyWeather[] {
    const timelines = apiResponse.data.timelines;
    const hourlyTimelines = timelines.filter(timeline => timeline.timestep === '1h');
  
    if (hourlyTimelines.length > 0) {
      const hourlyData: HourlyWeather[] = [];
      hourlyTimelines.forEach(hourlyTimeline => {
        hourlyTimeline.intervals.forEach(interval => {
          const entry: HourlyWeather = {
            startTime: interval.startTime,
            ...interval.values
          };
          hourlyData.push(entry);
        });
      });
      console.log(hourlyData);
      return hourlyData;
    } else {
      console.error('No hourly timeline found in data');
      return [];
    }
  }