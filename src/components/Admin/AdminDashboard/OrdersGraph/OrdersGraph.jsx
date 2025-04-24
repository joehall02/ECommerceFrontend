import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersGraph = ({ graphData }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const labels = monthNames;
  const orders = monthNames.map((_, index) => graphData[index + 1] || 0);

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
