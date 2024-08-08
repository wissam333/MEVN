<template>
  <apexchart
    type="area"
    height="340"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
// store
import { dashboard } from "../../stores/counter";
const getChartsData = dashboard();

const series = ref();
const chartOptions = ref();
const route = useRoute();

let productIncom = ref();

onBeforeMount(async () => {
  productIncom.value = await getChartsData.getProductIncom(
    route.params.productId
  );
  // Get the keys and sort them numerically
  const keys = Object.keys(productIncom.value)
    .map(Number)
    .sort((a, b) => a - b);

  // Create an array with the values in the sorted order
  const incomArray = keys.map((key) => productIncom.value[key]);

  series.value = [
    {
      name: "Products",
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
    colors: ["#19ad7b"],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
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
          return "" + val;
        },
      },
    },
  };
});
</script>
