export const baseOptions = {
  title: {
    text: '',
    textStyle: {
      color: '#333',
      fontSize: 12,
    },
    top: 0,
  },
  color: ['#31A18A', '#FA1515', '#EAD412', '#F59A23'],
  tooltip: {
    confine: true,
    backgroundColor: '#fff',
    borderColor: '#fff',
    extraCssText: 'box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);font-size:12px',
    textStyle: {
      color: '#606266',
    },
  },
  grid: {
    left: 10,
    right: 10,
  },
  yAxis: {
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        dashOffset: 2,
      },
    },
    axisLabel: {
      interval: 0,
      color: '#909399',
      fontSize: 10,
    },
  },
  xAxis: {
    axisTick: {
      show: false,
    },
  },
  toolbox: {
    // feature: {
    //   saveAsImage: {}
    // }
  },
}
