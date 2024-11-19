import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsWindbarb from 'highcharts/modules/windbarb';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDataGrouping from 'highcharts/modules/datagrouping';
import HighchartsPatternFill from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';
import { HourlyWeather } from '../../../utils/weatherUtils';
import Meteogram from '../../../utils/meteogramUtils';

HighchartsWindbarb(Highcharts);
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsDataGrouping(Highcharts);
HighchartsPatternFill(Highcharts);

interface MeteogramProps {
  weatherData: HourlyWeather[];
}

const MeteogramComponent: React.FC<MeteogramProps> = ({ weatherData }) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  useEffect(() => {
    const meteogram = new Meteogram({ json: weatherData, container: 'meteogram-container' });
    setChartOptions(meteogram.getChartOptions());
  }, [weatherData]);

  return (
    <div id="meteogram-container" style={{ width: '100%', height: 'auto' }}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MeteogramComponent;
