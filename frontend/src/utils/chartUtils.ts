import Highcharts from 'highcharts';
import { DailyWeather } from './weatherUtils';

export function getTemperatureChartOptions(dailyWeatherData: DailyWeather[]) {
  const temperatureData: [number, number, number][] = [];
  dailyWeatherData.forEach((entry) => {
    const date = new Date(entry.date).getTime();
    const tempMin = entry.temperatureMin;
    const tempMax = entry.temperatureMax;
    temperatureData.push([date, tempMin, tempMax]);
  });

  function formatDateRange(data: [number, number, number][]) {
    const firstDate = Highcharts.dateFormat('%A, %b %e', data[0][0]);
    const lastDate = Highcharts.dateFormat('%A, %b %e', data[data.length - 1][0]);
    return `${firstDate} - ${lastDate}`;
  }

  return {
    chart: {
      type: 'arearange',
      zooming: {
        type: 'x'
      },
      scrollablePlotArea: {
        minWidth: 350,
        scrollPositionX: 1
      },
      width: null,
      height: null
    },
    title: {
      text: 'Temperature Ranges (Min, Max)'
    },
    xAxis: {
      type: 'datetime',
      accessibility: {
        rangeDescription: `Range: ${formatDateRange(temperatureData)}`
      }
    },
    yAxis: {
      title: {
        text: ' '
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: '°F',
      xDateFormat: '%A, %b %e'
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Temperatures',
      data: temperatureData,
      lineColor: '#27a3fc',
      marker: {
        fillColor: '#27a3fc',
        lineWidth: 2,
        lineColor: '#27a3fc',
        radius: 2
      },
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        },
        stops: [
          [0, '#e1a84c'],
          [1, '#c4e5fb']
        ]
      }
    }],
    accessibility: {
      enabled: true,
    }
  };
}