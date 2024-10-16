export const markPoint = (name: string, color: string, unit: string) => ({
  symbol: '',
  symbolSize: 0,
  label: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (params: any) =>
      `{icon|}` + `{name|${name}}` + '\n' + `{text|${params.value.toFixed(2) + unit}}`,
    color: '#333',
    backgroundColor: '#fff',
    offset: [0, -30],
    padding: [2, 10, 2, 10],
    lineHeight: 20,
    borderRadius: 4,
    shadowBlur: 3,
    shadowColor: '#888',
    shadowOffsetX: 0,
    shadowOffsetY: 1,
    align: 'center',
    rich: {
      icon: {
        backgroundColor: color,
        height: 10,
        width: 10,
        borderRadius: 100,
      },
      name: {
        padding: [0, 10, 0, 10],
        color: '#666666',
        fontSize: 14,
      },
      val: {
        color: color,
        height: 10,
        width: 10,
        borderRadius: 100,
        fontSize: 14,
      },
    },
  },
  data: [
    {
      type: 'max',
      name: '最大值',
      // symbolOffset: [0, -20]
    },
    // {
    //   type: 'min',
    //   name: '最小值',
    //   symbolOffset: [0, -10]
    // }
  ],
})
