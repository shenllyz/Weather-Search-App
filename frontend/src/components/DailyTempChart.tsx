import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDataGrouping from 'highcharts/modules/datagrouping';
import HighchartsWindbarb from 'highcharts/modules/windbarb';
import HighchartsPatternFill from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';
import { getTemperatureChartOptions } from '../utils/chartUtils';
import { DailyWeather } from '../utils/weatherUtils';
HighchartsMore(Highcharts);
 
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsDataGrouping(Highcharts);
HighchartsWindbarb(Highcharts);
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
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default DailyTempChart;