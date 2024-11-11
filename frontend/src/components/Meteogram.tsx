import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsWindbarb from 'highcharts/modules/windbarb';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDataGrouping from 'highcharts/modules/datagrouping';
import HighchartsPatternFill from 'highcharts/modules/pattern-fill';
import HighchartsReact from 'highcharts-react-official';
import { DailyWeather } from '../utils/weatherUtils';
HighchartsWindbarb(Highcharts);
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsDataGrouping(Highcharts);
HighchartsPatternFill(Highcharts);

interface MeteogramProps{
    weatherData: DailyWeather[];    
}


