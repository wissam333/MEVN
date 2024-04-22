import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";

export const auth = defineStore("auth", () => {
  const router = useRouter();

  let login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("success", true);
      router.push("/HomeView/Dashboard");
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };
  return { login };
});

export const golbalVar = defineStore("golbalVar", () => {
  let sidebar = ref(true);
  let activeLink = ref("Dashboard");
  let subActiveLink = ref("");
  return { sidebar, activeLink, subActiveLink };
});

export const dashboard = defineStore("dashboard", () => {
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
    getIncom,
    incom,
    getstates,
    states,
    getMonthlyIncrease,
    monthlyIncrease,
  };
});

export const product = defineStore("product", () => {
  let productImage = ref();
  let imageName = ref();
  let addProduct = async (token, data) => {
    try {
      const formData = new FormData();
      data.color.forEach((color, index) => {
        formData.append(`color[${index}]`, color);
      });
      data.size.forEach((size, index) => {
        formData.append(`size[${index}]`, size);
      });
      data.categories.forEach((categorie, index) => {
        formData.append(`categories[${index}]`, categorie);
      });
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("price", data.price);
      formData.append("imgName", imageName.value);
      formData.append("img", productImage.value);

      const response = await axios.post(
        "http://192.168.1.105:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };

  return {
    addProduct,
    productImage,
    imageName,
  };
});
