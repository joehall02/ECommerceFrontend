import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersGraph = () => {
  const data = [
    { month: "January", orders: 10 },
    { month: "February", orders: 20 },
    { month: "March", orders: 30 },
    { month: "April", orders: 40 },
    { month: "May", orders: 50 },
    { month: "June", orders: 60 },
    { month: "July", orders: 70 },
    { month: "August", orders: 80 },
    { month: "September", orders: 90 },
    { month: "October", orders: 10 },
    { month: "November", orders: 110 },
    { month: "December", orders: 120 },
  ];

  const labels = data.map((item) => item.month);
  const orders = data.map((item) => item.orders);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Orders",
        data: orders,
        fill: false,
        borderColor: "#000",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default OrdersGraph;
