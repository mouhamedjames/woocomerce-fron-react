import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import styles from "./Chart.module.scss";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = ({service}) => {
  

  // Create a new array of order status
  const array = [];
  service.map((item) => {
    const { accpet} = item;
    return array.push(accpet);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3] = [
    "Waiting",
    "accepted",
    "declined",
   
  ];

  const Waiting = getOrderCount(array, q1);
  const accepeted = getOrderCount(array, q2);
  const declined = getOrderCount(array, q3);
 

  const data = {
    labels: ["Waiting", "accepeted", "declined"],
    datasets: [
      {
        label: "Order count",
        data: [Waiting, accepeted, declined],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Service Status</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
