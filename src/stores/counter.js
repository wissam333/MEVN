import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const golbalVar = defineStore("golbalVar", () => {
  let sidebar = ref(true);
  let activeLink = ref("Dashboard");
  let subActiveLink = ref("");
  return { sidebar, activeLink, subActiveLink };
});

export const dashboard = defineStore("dashboard", () => {
  let token = ref(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDllNDQ0NTRmNGExYTFiZmMzYmZiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMzQ1MDM2OSwiZXhwIjoxNzEzNzA5NTY5fQ.D4kcmoYWVMg5w8-pLC0dM-wupN8NeqvnjKay0bSqaUY"
  );

  let incom = ref();
  let getIncom = async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.1.105:5000/api/dashboard/income",
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      incom.value = response.data;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  let states = ref();
  let getstates = async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.1.105:5000/api/dashboard/dashboardStates",
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      states.value = response.data;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  let monthlyIncrease = ref();
  let getMonthlyIncrease = async (token) => {
    try {
      const response = await axios.get(
        "http://192.168.1.105:5000/api/dashboard/getSalesComparison",
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      monthlyIncrease.value = response.data;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    token,
    getIncom,
    incom,
    getstates,
    states,
    getMonthlyIncrease,
    monthlyIncrease,
  };
});
