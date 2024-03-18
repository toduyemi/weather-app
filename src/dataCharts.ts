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
          bottom: 10.15,
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
            anchor: 'end',
            align: 'end',
            font: {
              weight: 'bold',
            },
            formatter: (value) => `${((value as number) * 100).toFixed()}%`,
          },
        },
      ],
    },
  });
  const chartCtr2 = document.querySelector('#temp-chart2') as HTMLCanvasElement;
  new Chart(chartCtr2, {
    type: 'line',
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 51.35,
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
          grid: {
            drawTicks: false,
          },
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

// Chart2 ===================>
