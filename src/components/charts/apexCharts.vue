<template>
  <apexchart
    type="bar"
    height="340"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
// store
import { dashboard } from "../../stores/counter";
import { storeToRefs } from "pinia";
const getChartsData = dashboard();
const { incom } = storeToRefs(getChartsData);

const series = ref();
const chartOptions = ref();

const token = localStorage.getItem("token");
let incomArray = Array.from({ length: 12 }).fill(0);
onBeforeMount(async () => {
  await getChartsData.getIncom(token);
  incom.value?.forEach((entry) => {
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
