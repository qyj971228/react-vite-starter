// Chart.tsx
import { useEffect, useRef, forwardRef, useImperativeHandle, memo } from 'react'
import * as echarts from 'echarts'
import { merge } from 'lodash-es'
import { baseOptions } from './baseOptions'
import useElementSize from '@/hooks/useElementSize'

export interface ChartHandle {
  getInstance: () => echarts.ECharts | void
}

export interface ChartProps {
  options: object
  width?: string
  height?: string
}

const Chart = memo(
  forwardRef<ChartHandle, ChartProps>(({ options, width, height }, ref) => {
    const chartRef = useRef<echarts.ECharts | null>(null)

    const { domRef } = useElementSize(() => {
      chartRef.current?.resize()
    })

    // init
    useEffect(() => {
      if (domRef.current) {
        if (!chartRef.current) {
          const instance = echarts.init(domRef.current)
          chartRef.current = instance
        }
      }
      return () => {
        chartRef.current?.clear()
        chartRef.current?.dispose()
      }
    }, [])

    // options
    useEffect(() => {
      const mergedOptions = merge(JSON.parse(JSON.stringify(baseOptions)), options)
      chartRef.current?.setOption(mergedOptions, true)
    }, [options])

    function getInstance() {
      if (chartRef.current) {
        return chartRef.current
      }
    }

    useImperativeHandle(ref, () => ({
      getInstance,
    }))

    return (
      <div
        id='chart'
        ref={domRef}
        style={{
          height: height ? height : 'inherit',
          width: width ? width : 'inherit',
        }}
      ></div>
    )
  })
)

export default Chart
