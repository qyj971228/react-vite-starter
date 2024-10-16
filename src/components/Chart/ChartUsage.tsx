import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { markPoint } from './markPoint'
import useOpp from '@/hooks/useOpp'
import Chart, { ChartHandle } from './Chart'
import { throttle } from 'lodash-es'

export default function ChartUsage() {
  const chartConfig1 = (x: string[], y: { date: string; data: number[] }[], title: string) => {
    return {
      brush: {
        toolbox: [''],
        xAxisIndex: 'all',
      },
      color: ['#7090FF', '#9766C1', '#935223'],
      title: {
        text: title,
        left: 10,
        top: 10,
        textStyle: {
          fontSize: 16,
        },
      },
      xAxis: {
        type: 'category',
        data: x,
        axisLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '单位: MW',
          nameTextStyle: {
            padding: [0, 0, 10, 0],
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              dashOffset: 2,
            },
          },
          axisLabel: {
            interval: 0,
            color: '#6E7079',
            fontSize: 12,
          },
        },
      ],
      dataZoom: [
        {
          show: false,
          realtime: false,
          start: 0,
          end: 100,
          height: 0,
        },
      ],
      grid: {
        top: 80,
        left: 50,
        right: 20,
        bottom: 70,
      },
      legend: {
        left: 'center',
        bottom: 10,
        icon: 'roundRect',
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value: string) => (value ? Number(value).toFixed(2) + ' MW' : '-'),
      },
      series: [
        ...y.map(el => {
          return {
            name: el.date,
            data: el.data,
            type: 'line',
            smooth: true,
            markPoint: markPoint,
          }
        }),
      ],
    }
  }

  const [option, setoption] = useState(
    chartConfig1(['1', '2', '3'], [{ date: '123', data: [1, 2, 3] }], 'title')
  )

  const [state, hide, show] = useOpp()
  function onHanldeChangeOption() {
    if (!state) {
      show()
      setoption(chartConfig1(['1', '2', '3', '4'], [{ date: '123', data: [1, 2, 3] }], 'title'))
    } else {
      hide()
      setoption(chartConfig1(['1', '2', '3'], [{ date: '123', data: [1, 2, 3] }], 'title'))
    }
  }

  const chartRef = useRef<ChartHandle>(null)

  useEffect(() => {
    const instance = chartRef.current?.getInstance()
    instance?.on(
      'brushSelected',
      throttle(e => {
        console.log(e)
      }, 100)
    )
    instance?.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'brush',
      brushOption: {
        brushType: 'lineX',
        brushMode: 'single',
      },
    })
  }, [])

  return (
    <div>
      <Button onClick={onHanldeChangeOption}>change chart options</Button>
      <Chart
        ref={chartRef}
        options={option}
        height='200px'
      ></Chart>
    </div>
  )
}
