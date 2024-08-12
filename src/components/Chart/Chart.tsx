import {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as echarts from "echarts";
import { merge } from "lodash-es";
import { baseOptions } from "./baseOptions";
import useElementSize from "@/hooks/useElementSize";

export interface ChartHandle {
  dispatchAction: (config: echarts.Payload) => void;
  on: (event: string, callback: (e: unknown) => void) => void;
}

export interface ChartProps {
  options: object;
  onChartInstanceRendered?: (instance?: echarts.ECharts) => void;
  width?: string;
  height?: string;
}

const Chart = forwardRef<ChartHandle, ChartProps>(
  ({ options, onChartInstanceRendered, width, height }, ref) => {
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
      null
    );

    const actionsRef = useRef<string[]>([]);

    const elementSizeCallback = useCallback(() => {
      chartInstance?.resize();
    }, [chartInstance]);

    const { domRef } = useElementSize(elementSizeCallback);

    // init
    useEffect(() => {
      if (domRef.current) {
        new Promise((resolve: (value: echarts.ECharts) => void) => {
          const instance = echarts.init(domRef.current);
          setChartInstance(instance);
          setOptions(options);
          resolve(instance);
        }).then((instance) => {
          onChartInstanceRendered && onChartInstanceRendered(instance);
        });
        return () => {
          actionsRef.current.forEach((event) => {
            chartInstance?.off(event);
          });
          chartInstance?.clear();
          chartInstance?.dispose();
        };
      }
    }, [domRef.current]);

    // options
    const setOptions = useCallback(
      (value?: object) => {
        if (chartInstance) {
          const mergedOptions = merge(
            JSON.parse(JSON.stringify(baseOptions)),
            value
          );
          chartInstance.setOption(mergedOptions, true);
        }
      },
      [chartInstance]
    );

    useEffect(() => {
      setOptions(options);
    }, [options, setOptions]);

    // actions
    const dispatchAction = (config: echarts.Payload) => {
      if (!chartInstance) {
        console.warn("chartInstance is null or undefined");
        return;
      }
      chartInstance.dispatchAction(config);
    };

    const on = (event: string, callback: (e: unknown) => void) => {
      if (!chartInstance) {
        console.warn("chartInstance is null or undefined");
        return;
      }
      chartInstance.off(event);
      chartInstance.on(event, callback);
      actionsRef.current.push(event);
    };

    useImperativeHandle(ref, () => ({
      dispatchAction,
      on,
    }));

    return (
      <div
        id="chart"
        ref={domRef}
        style={{
          height: height ? height : "inherit",
          width: width ? width : "inherit",
        }}
      ></div>
    );
  }
);

export default Chart;
