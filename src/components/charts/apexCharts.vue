<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { dashboard } from "../../stores/counter";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const getChartsData = dashboard();
const { token, incom } = storeToRefs(getChartsData);
//end store

const series = ref();
const chartOptions = ref();

let incomArray = Array.from({ length: 12 }).fill(0);
onMounted(async () => {
  await getChartsData.getIncom(token.value);
  incom.value.forEach((entry) => {
    incomArray[entry._id] = entry.total;
  });

  series.value = [
    {
      name: "profit",
      data: incomArray,
    },
  ];

  chartOptions.value = {
    responsive: [
      {
        breakpoint: 768, // Breakpoint for mobile devices
        options: {
          chart: {
            height: 250, // Adjust the height for mobile
          },
        },
      },
    ],
    colors: ["#003d29", "#8b5cf6"],
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val;
        },
      },
    },
  };
});
</script>
