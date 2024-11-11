import Highcharts from 'highcharts';
import { HourlyWeather } from '../utils/weatherUtils';
 

class Meteogram {
  private winds: Highcharts.PointOptionsObject[] = [];
  private temperatures: Highcharts.PointOptionsObject[] = [];
  private pressures: Highcharts.PointOptionsObject[] = [];
  private humidities: Highcharts.PointOptionsObject[] = [];
  private json: HourlyWeather[];
  private container: string;
  private chart: Highcharts.Chart | undefined;
  private resolution: number = 36e5;  

  constructor({ json, container }: { json: HourlyWeather[]; container: string }) {
    this.json = json;
    this.container = container;
    this.parseHourlyData();
  }

  private drawBlocksForWindArrows(chart: Highcharts.Chart) {
    const xAxis = chart.xAxis[0];

    if (xAxis.min === undefined || xAxis.max === undefined) {
      return;
    }

    for (let pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {
      const isLast = pos === max + 36e5;
      const x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);
      const isLong = this.resolution > 36e5 ? pos % this.resolution === 0 : i % 2 === 0;

      chart.renderer
        .path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28), 'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'] as any)
        .attr({
          stroke: chart.options.chart?.plotBorderColor || '#000000',
          'stroke-width': 1,
        })
        .add();
    }

    const windbarbs = chart.get('windbarbs') as Highcharts.Series | undefined;
    (windbarbs as any)?.markerGroup?.attr({
      translateX: ((windbarbs as any).markerGroup.translateX || 0) + 8,
    });
  }

  public getChartOptions(): Highcharts.Options {
    return {
      chart: {
        renderTo: this.container,
        marginBottom: 70,
        marginRight: 40,
        marginTop: 50,
        plotBorderWidth: 1,
        width: null,
        height: null,
        alignTicks: false,
        scrollablePlotArea: {
          minWidth: 600,
        },
      },
      time: {
        useUTC: false,
        timezone: 'America/Los_Angeles',
      },
      defs: {
        patterns: [
          {
            id: 'precipitation-error',
            path: {
              d: [
                'M', 3.3, 0, 'L', -6.7, 10,
                'M', 6.7, 0, 'L', -3.3, 10,
                'M', 10, 0, 'L', 0, 10,
                'M', 13.3, 0, 'L', 3.3, 10,
                'M', 16.7, 0, 'L', 6.7, 10,
              ].join(' '),
              stroke: '#68CFE8',
              strokeWidth: 1,
            },
          },
        ] as any,
      },
      title: {
        text: 'Hourly Weather (For Next 5 Days)',
        align: 'center',
        style: {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      },
      credits: {
        text: 'Forecast from <a href="https://tomorrow.io">tomorrow.io</a>',
        href: 'https://tomorrow.io',
        position: {
          x: -40,
        },
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.x:%A, %b %e, %H:%M} - <br>',
      },
      xAxis: [
        {
          type: 'datetime',
          tickInterval: 6 * 36e5,
          minorTickInterval: 36e5,
          tickLength: 0,
          gridLineWidth: 1,
          gridLineColor: 'rgba(128, 128, 128, 0.1)',
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          offset: 30,
          showLastLabel: true,
          labels: {
            format: '{value:%H}',
          },
          crosshair: true,
        },
        {
          linkedTo: 0,
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000,
          labels: {
            format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
            align: 'left',
            x: 3,
            y: 8,
          },
          opposite: true,
          tickLength: 20,
          gridLineWidth: 1,
        },
      ],
      yAxis: [
        {
          title: {
            text: null,
          },
          labels: {
            format: '{value}°',
            style: {
              fontSize: '10px',
            },
            x: -3,
          },
          plotLines: [
            {
              value: 0,
              color: '#BBBBBB',
              width: 1,
              zIndex: 2,
            },
          ],
          maxPadding: 0.3,
          minRange: 8,
          tickInterval: 1,
          gridLineColor: 'rgba(128, 128, 128, 0.1)',
        },
        {
          title: {
            text: null,
          },
          labels: {
            format: '{value} %',
            enabled: false,
          },
          gridLineWidth: 0,
          tickLength: 0,
          minRange: 10,
          min: 0,
        },
        {
          allowDecimals: false,
          title: {
            text: 'inHg',
            offset: 0,
            align: 'high',
            rotation: 0,
            style: {
              fontSize: '10px',
              color: '#ffbb00',
            },
            textAlign: 'left',
            x: 3,
          },
          labels: {
            style: {
              fontSize: '8px',
              color: '#ffbb00',
            },
            y: 2,
            x: 3,
          },
          gridLineWidth: 0,
          opposite: true,
          showLastLabel: false,
        },
      ],
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          pointPlacement: 'between',
        },
        windbarb: {
          dataGrouping: {
            enabled: false,
          },
        },
      },
      series: [
        {
          name: 'Temperature',
          data: this.temperatures,
          type: 'spline',
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
          tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}°C</b><br/>',
          },
          zIndex: 1,
          color: '#FF3333',
          negativeColor: '#48AFE8',
        },
        {
          name: 'Humidity',
          data: this.humidities,
          type: 'column',
          color: '#68CFE8',
          yAxis: 1,
          groupPadding: 0,
          pointPadding: 0,
          grouping: false,
          dataLabels: {
            enabled: true,
            filter: {
              operator: '>',
              property: 'y',
              value: 0,
            },
            style: {
              fontSize: '8px',
              color: '#666',
            },
          },
          tooltip: {
            valueSuffix: ' %',
          },
        },
        {
          name: 'Air pressure',
          type: 'spline',
          color: '#ffbb00',
          data: this.pressures,
          marker: {
            enabled: false,
          },
          shadow: false,
          tooltip: {
            valueSuffix: ' inHg',
          },
          dashStyle: 'ShortDot',
          yAxis: 2,
        },
        {
          name: 'Wind',
          type: 'windbarb',
          id: 'windbarbs',
          color: Highcharts.getOptions().colors?.[1] || '#000000',
          lineWidth: 1.5,
          data: this.winds,
          vectorLength: 12,
          yOffset: -15,
          xOffset: -6,
          tooltip: {
            valueSuffix: ' mph',
          },
        },
      ],
    };
  }

  private onChartLoad(chart: Highcharts.Chart) {
    this.drawBlocksForWindArrows(chart);
  }

  private createChart() {
    this.chart = new Highcharts.Chart(this.getChartOptions(), (chart) => {
      this.onChartLoad(chart);
    });
  }

  private error() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.innerHTML = '<i class="fa fa-frown-o"></i> Failed loading data, please try again later';
    }
  }

  private parseHourlyData() {
    if (!this.json) {
      return this.error();
    }
   
    this.json.forEach((item, index) => {
      const x = Date.parse(item.startTime);
  
      this.humidities.push({ x, y: item.humidity });    
      if (index % 2 === 0) {
        this.winds.push({
          x,
          value: item.windSpeed,
          direction: item.windDirection,
        });
      }

      this.pressures.push({ x, y: item.pressureSeaLevel });
      this.temperatures.push({ x, y: item.temperature });
    });

    this.createChart();
  }
}

export default Meteogram; 