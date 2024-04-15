import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const golbalVar = defineStore("golbalVar", () => {
  let sidebar = ref(true);
  let activeLink = ref("Dashboard");
  return { sidebar, activeLink };
});

export const dashboard = defineStore("dashboard", () => {
  let token = ref(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDllNDQ0NTRmNGExYTFiZmMzYmZiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMzE3NzAyNiwiZXhwIjoxNzEzNDM2MjI2fQ.Bv-dsvgKa_GF9zoxwP1GT0FDNF9m3E5C8FrkEFALBT8"
  );

  let incom = ref();
  let getIncom = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/income",
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
      alert(error);
    }
  };

  let states = ref();
  let getstates = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/dashboardStates",
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
      alert(error);
    }
  };
  getstates(token.value);

  return { token, getIncom, incom, getstates, states };
});
