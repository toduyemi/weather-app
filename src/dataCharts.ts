import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { enUS } from 'date-fns/locale';
import { ForecastObj } from './appTypes.types';

//chart 1 ===================>
export async function renderChart(forecast: ForecastObj[]) {
  const getMaxValueWithPadding = () => {
    return Math.max(...forecast.map((row) => row.pop)) + 0.1;
  };
  const chartCtr = document.querySelector('#temp-chart1') as HTMLCanvasElement;
  new Chart(chartCtr, {
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
        // zoom: {
        //   pan: {
        //     // pan options and/or events
        //     enabled: true,
        //     mode: 'x',
        //   },
        //   limits: {
        //     // axis limits
        //   },
        //   zoom: {
        //     // zoom options and/or events
        //   },
        // },
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
            drawTicks: false,
          },
          border: {
            display: false,
          },
        },
        yPop: {
          display: false,
          max: getMaxValueWithPadding(),
        },
        yLev: {
          display: false,
        },
      },
    },
    data: {
      labels: forecast.map((row) => row.date),
      datasets: [
        {
          label: 'temp every 3 hrs',
          data: forecast.map((row) => row.temp),
          yAxisID: 'yTemp',
          datalabels: {
            display: false,
          },
        },
        {
          label: 'probability of preciptation',
          data: forecast.map((row) => row.pop),
          yAxisID: 'yPop',
          type: 'bar',
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
                  return [words[0], words[1]];
                },
              },
              value: {
                anchor: 'end',
                align: 'end',
                font: {
                  size: 8.5,
                  weight: 'bold',
                },
                formatter: (value, context) => {
                  const bar = forecast[context.dataIndex];
                  const sum = (bar.rain ?? 0) + (bar.snow ?? 0);
                  if (sum)
                    return `${sum} mm/h\n${(
                      (value as number) * 100
                    ).toFixed()}%`;
                  else return `${((value as number) * 100).toFixed()}%`;
                },
                textAlign: 'center',
              },
            },
          },
        },
        {
          label: '3h rain',
          type: 'bar',
          yAxisID: 'yLev',
          data: forecast.map((row) => row.pop),
          datalabels: {
            anchor: 'start',
          },
          hidden: true,
        },
      ],
    },
  });
  // Chart2 ===================>
  const chartCtr2 = document.querySelector('#temp-chart2') as HTMLCanvasElement;
  new Chart(chartCtr2, {
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
        // zoom: {
        //   pan: {
        //     // pan options and/or events
        //     enabled: true,
        //     mode: 'x',
        //   },
        //   limits: {
        //     // axis limits
        //   },
        //   zoom: {
        //     // zoom options and/or events
        //   },
        // },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          // grid: {
          //   drawTicks: false,
          // },
        },
        y: {
          afterFit: (ctx) => {
            ctx.width = 35;
          },
          ticks: {
            callback: (value) => `${value} C`,
          },
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
