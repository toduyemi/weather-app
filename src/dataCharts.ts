import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { enUS } from 'date-fns/locale';
import { ForecastObj, Units } from './appTypes.types';
import { getElement, printUnit } from './controller';

//chart 1 ===================>
let chart1: Chart, chart2: Chart;
export async function renderChart(forecast: ForecastObj[], unitState: Units) {
  const getMaxValueWithPadding = () => {
    return (
      Math.max(...forecast.map((row) => (row.rain ?? 0) + (row.snow ?? 0))) *
      1.1
    );
  };

  Chart.defaults.color = 'rgba(255, 255, 255, 0.8)';
  const chartCtr = document.querySelector('#temp-chart1') as HTMLCanvasElement;
  if (chart1) chart1.destroy();
  if (chart2) chart2.destroy();

  chart1 = new Chart(chartCtr, {
    type: 'line',
    plugins: [ChartDataLabels],
    options: {
      layout: {
        padding: {
          bottom: 47.15,
        },
      },
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          adapters: {
            date: {
              locale: enUS,
            },
          },
          grid: {
            display: false,
          },
          type: 'time',
          ticks: {
            stepSize: 3,
            major: {
              enabled: true,
            },
          },
          time: {
            unit: 'hour',
            tooltipFormat: 'HH:mm',
          },
          position: 'top',
        },
        yTemp: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          suggestedMin: 0,
        },
        yPop: {
          display: false,
          // falsy OR in case get MaxValue returns 0 due to dataset of only 0s
          max: getMaxValueWithPadding() || 1,
        },
        yLev: {
          display: false,
        },
      },
    },
    data: {
      labels: forecast.map((row) => row.date),
      datasets: [
        //test data for NaN
        // {
        //   yAxisID: 'yPop2',
        //   type: 'bar',
        //   label: '# of Points',
        //   data: new Array(40).fill(0),
        //   borderWidth: 1,
        // },
        {
          type: 'line',
          label: 'temp every 3 hrs',
          data: forecast.map((row) => row.temp),
          tension: 0.4,
          pointStyle: 'rectRounded',
          yAxisID: 'yTemp',
          datalabels: {
            display: false,
          },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.4)',
        },
        {
          label: '3h rain level',
          type: 'bar',
          data: forecast.map((row) => {
            return (row.rain ?? 0) + (row.snow ?? 0);

            // return 0;
          }),
          yAxisID: 'yPop',
          backgroundColor: 'rgba(151,187,205,0.5)',
          borderColor: 'rgba(151,187,205,0.8)',
          borderWidth: 1.5,
          borderRadius: 4,

          datalabels: {
            labels: {
              description: {
                anchor: 'start',
                align: 'start',
                font: {
                  size: 8.5,
                },
                formatter: (value, context) => {
                  const bar = forecast[context.dataIndex];
                  const words = bar.weather.description.split(' ');
                  return [...words];
                },
              },
              precipitation: {
                anchor: 'end',
                align: 'end',
                offset: 15,
                font: {
                  size: 8.3,
                  weight: 'bold',
                },
                formatter: (value, context) => {
                  if (value) return `${value} mm/h`;
                  else return '';
                },
                textAlign: 'center',
              },
              probability: {
                anchor: 'end',

                align: 'end',
                font: {
                  size: 8.3,
                },
                formatter: (value, context) => {
                  const bar = forecast[context.dataIndex];
                  return `${(bar.pop * 100).toFixed()}%`;
                },
                textAlign: 'center',
              },
            },
          },
        },
      ],
    },
  });
  // Chart2 ===================>
  const chartCtr2 = document.querySelector('#temp-chart2') as HTMLCanvasElement;
  chart2 = new Chart(chartCtr2, {
    type: 'line',
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 30,
          bottom: 41,
        },
      },
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          afterFit: (ctx) => {
            ctx.width = 43;
          },
          ticks: {
            callback: (value) => {
              if (unitState == Units.metric) return `${value}\u00B0C`;
              else return `${value}\u00B0F`;
            },
          },
          suggestedMin: 0,
        },
      },
    },
    data: {
      labels: forecast.map((row) => row.date),
      datasets: [
        {
          label: 'temp every 3 hrs',
          data: forecast.map((row) => row.temp),
        },
      ],
    },
  });
}
function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }
  else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}
