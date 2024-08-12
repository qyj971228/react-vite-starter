import { useRef, useState } from "react";
import Chart, { ChartHandle } from "./Chart";
import { throttle } from "lodash-es";
import { Button } from "antd";
import { markPoint } from "./markPoint";
import useOpp from "@/hooks/useOpp";

export default function Home() {
  const chartRef = useRef<ChartHandle>(null);

  const chartConfig1 = (
    x: string[],
    y: { date: string; data: number[] }[],
    title: string
  ) => {
    return {
      brush: {
        toolbox: [""],
        xAxisIndex: "all",
      },
      color: ["#7090FF", "#9766C1", "#935223"],
      title: {
        text: title,
        left: 10,
        top: 10,
        textStyle: {
          fontSize: 16,
        },
      },
      xAxis: {
        type: "category",
        data: x,
        axisLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: "value",
          name: "单位: MW",
          nameTextStyle: {
            padding: [0, 0, 10, 0],
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              dashOffset: 2,
            },
          },
          axisLabel: {
            interval: 0,
            color: "#6E7079",
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
        left: "center",
        bottom: 10,
        icon: "roundRect",
      },
      tooltip: {
        trigger: "axis",
        valueFormatter: (value: string) =>
          value ? Number(value).toFixed(2) + " MW" : "-",
      },
      series: [
        ...y.map((el) => {
          return {
            name: el.date,
            data: el.data,
            type: "line",
            smooth: true,
            markPoint: markPoint,
          };
        }),
      ],
    };
  };

  const [option, setoption] = useState(
    chartConfig1(["1", "2", "3"], [{ date: "123", data: [1, 2, 3] }], "title")
  );

  const [state, hide, show] = useOpp();
  function onHanldeChangeOption() {
    if (!state) {
      show();
      setoption(
        chartConfig1(
          ["1", "2", "3", "4"],
          [{ date: "123", data: [1, 2, 3] }],
          "title"
        )
      );
    } else {
      hide();
      setoption(
        chartConfig1(
          ["1", "2", "3"],
          [{ date: "123", data: [1, 2, 3] }],
          "title"
        )
      );
    }
  }

  const onChartInstanceRendered = (instance?: echarts.ECharts) => {
    // 可以直接操作instance实例或者调用ref操作暴露的方法
    console.log(instance);
    if (chartRef.current) {
      chartRef.current?.on(
        "brushSelected",
        throttle((e) => {
          console.log(e);
        }, 100)
      );
      chartRef.current.dispatchAction({
        type: "takeGlobalCursor",
        key: "brush",
        brushOption: {
          brushType: "lineX",
          brushMode: "single",
        },
      });
    }
  };

  return (
    <div>
      <Button onClick={onHanldeChangeOption}>change chart options</Button>
      <Chart
        ref={chartRef}
        options={option}
        height="200px"
        onChartInstanceRendered={onChartInstanceRendered}
      ></Chart>
    </div>
  );
}
