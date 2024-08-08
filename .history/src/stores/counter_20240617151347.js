import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";

const HOST = "192.168.1.107";

export const auth = defineStore("auth", () => {
  const router = useRouter();

  let login = async (data) => {
    try {
      const response = await axios.post(
        `http://${HOST}:5000/api/auth/login`,
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
  const token = localStorage.getItem("token");
  let incom = ref();
  let getIncomExcuted = ref(false);
  let getIncom = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/dashboard/income`,
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
  let getStatesExcuted = ref(false);
  let getstates = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/dashboard/dashboardStates`,
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
  let getMonthlyIncreaseExcuted = ref(false);
  let getMonthlyIncrease = async () => {
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/dashboard/getSalesComparison`,
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

  let getProductIncom = async (productId) => {
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/dashboard/getMonthlySalesDataForProduct/${productId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  let getSalesDataForProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/dashboard/getSalesDataForProduct/${productId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getIncom,
    incom,
    getIncomExcuted,
    getstates,
    states,
    getStatesExcuted,
    getMonthlyIncrease,
    monthlyIncrease,
    getMonthlyIncreaseExcuted,
    getProductIncom,
    getSalesDataForProduct,
  };
});

export const product = defineStore("product", () => {
  let productImage = ref();
  let imageName = ref();
  const token = localStorage.getItem("token");

  let addProduct = async (data) => {
    try {
      const formData = new FormData();
      const { title, desc, price, color, size, categories } = data;
      color.forEach((color, index) => {
        formData.append(`color[${index}]`, color);
      });
      size.forEach((size, index) => {
        formData.append(`size[${index}]`, size);
      });
      categories.forEach((categorie, index) => {
        formData.append(`categories[${index}]`, categorie);
      });
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("imgName", imageName.value);
      formData.append("img", productImage.value);

      const response = await axios.post(
        `http://${HOST}:5000/api/products`,
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

  let productLoading = ref(false);
  let getProducts = async (page, pageSize) => {
    productLoading.value = true;
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/products?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      productLoading.value = false;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://${HOST}:5000/api/products/${productId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };

  let getProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/products/find/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  let updateProduct = async (productId, data) => {
    try {
      const formData = new FormData();
      const { title, desc, price, color, size, categories, img } = data;
      color.forEach((color, index) => {
        formData.append(`color[${index}]`, color);
      });
      size.forEach((size, index) => {
        formData.append(`size[${index}]`, size);
      });
      categories.forEach((categorie, index) => {
        formData.append(`categories[${index}]`, categorie);
      });
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("imgName", img.name);
      formData.append("img", img);

      const response = await axios.put(
        `http://${HOST}:5000/api/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };

  let productsTempLoading = ref(false);
  let getProductsTemp = async (page, pageSize) => {
    productsTempLoading.value = true;
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/products/getProductsTemp`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      productsTempLoading.value = false;
    }
  };

  let addToInventory = async (data) => {
    try {
      const response = await axios.post(
        `http://${HOST}:5000/api/inventory/addToInventory`,
        { products: [data] },
        {
          headers: {
            "Content-Type": "application/json",
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

  let getInventoriesLoading = ref(false);
  let getInventories = async (page, pageSize) => {
    getInventoriesLoading.value = true;
    try {
      const response = await axios.get(
        `http://${HOST}:5000/api/inventory/getAllInventories`,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      getInventoriesLoading.value = false;
    }
  };

  const deleteInventory = async (inventoryId) => {
    try {
      const response = await axios.delete(
        `http://${HOST}:5000/api/inventory/deleteInventory/${inventoryId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
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
    getProducts,
    productLoading,
    deleteProduct,
    getProduct,
    updateProduct,
    getProductsTemp,
    productsTempLoading,
    addToInventory,
    getInventoriesLoading,
    getInventories,
    deleteInventory,
  };
});

export const Customers = defineStore("Customers", () => {
  const token = localStorage.getItem("token");

  let getCustomersLoading = ref(false);
  let getCustomers = async (page, pageSize) => {
    getCustomersLoading.value = true;
    try {
      const response = await axios.get(`http://${HOST}:5000/api/users`, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      getCustomersLoading.value = false;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://${HOST}:5000/api/users/${userId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };

  return { getCustomersLoading, getCustomers, deleteUser };
});

export const Orders = defineStore("Orders", () => {
  const token = localStorage.getItem("token");

  let getOrdersLoading = ref(false);
  let getOrders = async (page, pageSize) => {
    getOrdersLoading.value = true;
    try {
      const response = await axios.get(`http://${HOST}:5000/api/orders`, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      getOrdersLoading.value = false;
    }
  };

  const deleteOrder = async (userId) => {
    try {
      const response = await axios.delete(
        `http://${HOST}:5000/api/orders/${userId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };

  return { getOrdersLoading, getOrders, deleteOrder };
});
