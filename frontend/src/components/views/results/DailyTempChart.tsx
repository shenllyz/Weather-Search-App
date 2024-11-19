import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDataGrouping from 'highcharts/modules/datagrouping';
import HighchartsPatternFill from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';
import { getTemperatureChartOptions } from '../../../utils/chartUtils';
import { DailyWeather } from '../../../utils/weatherUtils';
import "../../../styles/customChart.scss"
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsDataGrouping(Highcharts);
HighchartsPatternFill(Highcharts);

interface DailyTempChartProps {
  weatherData: DailyWeather[];
}

const DailyTempChart: React.FC<DailyTempChartProps> = ({ weatherData }) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions(getTemperatureChartOptions(weatherData));
  }, [weatherData]);

  return (
    <div className='chart-container'>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default DailyTempChart;