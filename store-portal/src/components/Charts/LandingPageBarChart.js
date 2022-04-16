import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const LandingPageBarChart = () => {
  return (
    <div style={{ paddingRight: 15, maxWidth: "98%" }}>
      <Bar
        data={{
          // Name of the variables on x-axies for each bar
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          datasets: [
            {
              // Data or value of your each variable
              data: [1552, 1319, 1000, 613, 1400],
              // Color of each bar
              backgroundColor: [
                "#4BB4DE",
                "#4BB4DE",
                "#4BB4DE",
                "#4BB4DE",
                "#4BB4DE", 
              ],
              // Border color of each bar
              borderColor: [
                "white",
                "white",
                "white",
                "white",
                "white",
  
              ],
              borderWidth: 0.5,
            },
          ],
        }}
        // Height of graph
        height={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  // The y-axis value will start from zero
                  beginAtZero: true,
                },
              },
            ],
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Sales",
              color: "#4BB4DE",
              font: {
                size: 26,
                weight: "600",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LandingPageBarChart;
