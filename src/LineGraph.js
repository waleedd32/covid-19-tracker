import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const typeofCaseColors = {
  cases: {
    hex: "darkblue",
    rgb: "rgb(169, 32, 223)",
    half_op: "lightblue",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgba(125,215,29)",
    half_op: "rgba(125,215,29,0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgba(251,68,67)",
    half_op: "rgba(251,68,67,0.5)",
    multiplier: 2000,
  },
};

const builddataChart = (data, typeofCase) => {
  let dataChart = [];
  let lastPointOfData;
  for (let date in data.cases) {
    if (lastPointOfData) {
      let newDataPoint = {
        x: date,
        y: data[typeofCase][date] - lastPointOfData,
      };
      dataChart.push(newDataPoint);
    }
    lastPointOfData = data[typeofCase][date];
  }
  return dataChart;
};

const LineGraph = ({ typeofCase = "cases", className }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        );

        if (!response.ok) {
          console.error(`HTTP Error: ${response.status}`);
          return;
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Build the chart data
        let dataChart = builddataChart(data, typeofCase);

        setData(dataChart);

        console.log(dataChart);
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    };

    fetchData();
  }, [typeofCase]);

  return (
    <div className={className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                borderColor: typeofCaseColors[typeofCase].hex,
                backgroundColor: typeofCaseColors[typeofCase].half_op,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
