export const conf = {
  chart: {
    zoomType: 'x',
  },
  title: {
    text: 'USD to EUR exchange rate over time',
    align: 'left',
  },
  subtitle: {
    text: 'Click and drag in the plot area to zoom in',
    align: 'left',
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'Exchange rate',
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
      },
      marker: {
        radius: 2,
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
  },

  series: [
    {
      type: 'area',
      name: 'USD to EUR',
    },
  ],
};

export const options = {
  global: {
    useUTC: false,
  },
  lang: {
    decimalPoint: ',',
    thousandsSep: '.',
  },
};
