<template>
  <form
    class="contain"
    :class="sidebar ? 'shrink' : ''"
    @submit.prevent="addProduct"
  >
    <div class="title-container">
      <div class="head-title">
        <h4 class="header4">Add a new product</h4>
        <p>
          All Products are listed
          <router-link to="/HomeView/ListProduct"> here</router-link>
        </p>
      </div>
      <div class="mt-2">
        <input type="submit" value="Publish Product" class="btn btn-success" />
      </div>
    </div>

    <main>
      <div class="form row gy-3">
        <div class="col-sm-12 col-lg-8">
          <div class="main-info box block-border">
            <h5>Product Information</h5>

            <div class="d-flex flex-column">
              <div class="d-flex flex-column-reverse mb-3">
                <input
                  v-model="title"
                  id="title"
                  type="text"
                  required
                  maxlength="30"
                  autocomplete="off"
                  placeholder="Coton Shirt"
                  pattern="[A-Za-z\s]+"
                  title="Enter only letters and spaces"
                />
                <label for="title">Name</label>
              </div>

              <div class="d-flex flex-column-reverse mb-3">
                <textarea
                  v-model="desc"
                  id="description"
                  rows="5"
                  required
                  minlength="30"
                  placeholder="very good Coton Shirt"
                ></textarea>
                <label for="description">Description</label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-lg-4">
          <div
            class="second-info box block-border d-flex flex-column justify-content-between"
          >
            <h5>Color & Size</h5>

            <p>Please Select Colors</p>
            <div class="circles">
              <div
                class="circle colors"
                @click="activeColorFunc(color)"
                :class="activeColor.includes(color) ? 'active' : ''"
                v-for="color in colors"
                :key="color"
              >
                <span :style="{ backgroundColor: color }"></span>
              </div>
            </div>

            <p>Please Select Sizes</p>
            <div class="circles">
              <div
                @click="activeSizesFunc(size)"
                :class="activeSize.includes(size) ? 'active' : ''"
                class="circle sizes"
                v-for="size in sizes"
                :key="size"
              >
                <span>{{ size }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-lg-8">
          <div class="uplod-image box block-border">
            <h5>Product Image</h5>
            <DragAndDrop :uploadedImage="uploadedImage"></DragAndDrop>
          </div>
        </div>

        <div class="col-sm-12 col-lg-4">
          <div class="category-price box block-border">
            <h5>Category & Price</h5>

            <div class="d-flex flex-column">
              <div class="d-flex flex-column-reverse mb-3">
                <input
                  v-model="price"
                  id="price"
                  type="number"
                  required
                  maxlength="6"
                  min="0"
                  placeholder="Price"
                />
                <label for="price">Price</label>
              </div>

              <p>Please Select Categories</p>
              <div id="categories">
                <div class="custom-select">
                  <select v-model="selectedCat">
                    <option value="" selected disabled>New Category</option>
                    <option v-for="cat in categories" :value="cat">
                      {{ cat }}
                    </option>
                  </select>
                  <div class="plus-icon" @click="addCat">
                    <i class="bi bi-plus"></i>
                  </div>
                </div>
                <div
                  class="category badge bg-success me-2 p-2"
                  v-for="activeCat in activeCategories"
                >
                  {{ activeCat }}
                  <i
                    class="bi bi-trash3 ms-2"
                    @click="deleteCat(activeCat)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </form>
</template>
<script setup>
// basic imports
import { ref } from "vue";
import DragAndDrop from "../../components/DragAndDrop.vue";
// store
import { product, golbalVar } from "../../stores/counter";
import { storeToRefs } from "pinia";
const getGolbalVar = golbalVar();
const { sidebar } = storeToRefs(getGolbalVar);
const productAPI = product();
// toast imports
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// color picker
const colors = ref([
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "White",
  "Pink",
  "Brown",
  "Black",
]);
let activeColor = ref([]);
const activeColorFunc = (e) => {
  let colorIndex = activeColor.value.indexOf(e);
  if (activeColor.value.includes(e)) {
    activeColor.value.splice(colorIndex, 1);
  } else {
    activeColor.value.push(e);
  }
};

// size picker
const sizes = ref(["XL", "L", "M", "SM", "XS"]);
let activeSize = ref([]);
const activeSizesFunc = (e) => {
  let sizeIndex = activeSize.value.indexOf(e);
  if (activeSize.value.includes(e)) {
    activeSize.value.splice(sizeIndex, 1);
  } else {
    activeSize.value.push(e);
  }
};

// categories
let selectedCat = ref("");
let categories = ref(["Women", "Electronics"]);
let activeCategories = ref(["Men"]);
// add category
const addCat = () => {
  if (selectedCat.value) {
    let category = selectedCat.value;
    activeCategories.value.push(category);
    const index = categories.value.indexOf(selectedCat.value);
    if (index !== -1) {
      categories.value.splice(index, 1);
    }
    selectedCat.value = "";
  }
};

// delete category
const deleteCat = (activeCat) => {
  const index = activeCategories.value.indexOf(activeCat);
  if (index !== -1) {
    activeCategories.value.splice(index, 1);
  }
  categories.value.push(activeCat);
};

// publish product
const uploadedImage = ref(null);
let title = ref();
let desc = ref();
let price = ref();
let quantity = ref();
let productData = ref();

const addProduct = async () => {
  productData.value = {
    title: title.value,
    desc: desc.value,
    price: price.value,
    quantity: quantity.value,
    color: activeColor.value,
    size: activeSize.value,
    categories: activeCategories.value,
  };
  const res = await productAPI.addProduct(productData.value);
  if (res.status === 201 || res.status === 200) {
    success();
  } else {
    faild(res.data.message);
  }
  // restore default input fields
  title.value = "";
  desc.value = "";
  price.value = 0;
  quantity.value = 1;
  activeColor.value = [];
  activeSize.value = [];
  activeCategories.value = ["Men"];
  categories.value = ["Women", "Electronics"];
};

// Toast Management
const $toast = useToast();
let success = () => {
  $toast.success("Product Added Successfully", {
    position: "bottom-right",
  });
};
let faild = (message) => {
  $toast.error(message.substring(0, 1).toUpperCase() + message.substring(1), {
    position: "bottom-right",
  });
};
</script>
<style lang="scss">
.contain {
  overflow-x: hidden;
  transition: all 0.3s linear;
  width: 100%;
  min-height: calc(100vh - 77.6px);
  background-color: #f8f7fa;
  float: right;
  margin-top: 77.6px;
  padding: 16px;
  @media (max-width: 600px) {
    margin-top: 55px;
  }

  &.shrink {
    width: calc(100% - 260px); /* 100% + 260px(sidebar)*/
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0px;
    @media (max-width: 991px) {
      flex-direction: column;
      align-items: flex-start;
    }
    .head-title {
      p {
        font-size: 15px;
        color: #6d6a77;
        a {
          color: #19ad7b;
          text-decoration: underline;
        }
      }
    }
  }
  .form {
    .main-info,
    .second-info {
      padding: 25px;
      block-size: 100%;
      background-color: #fff;
      h5 {
        margin: 16px 0px;
      }
    }
    .second-info {
      .circles {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
        .circle {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 33px;
          height: 33px;
          border: 2px solid transparent;
          margin: 2px;
          cursor: pointer;

          &.active {
            border: 2px solid #19ad7b;
          }

          span {
            display: flex;
            width: 25px;
            height: 25px;
            border: 1px solid #c5c5c5;
            justify-content: center;
            font-size: 13px;
            align-items: center;
          }
          &.colors {
            border-radius: 50%;
            span {
              border-radius: 50%;
            }
          }
          &.sizes {
            border-radius: 6px;
            span {
              border-radius: 6px;
            }
          }
        }
      }
    }
  }
  .uplod-image {
    background-color: #fff;
    padding: 25px;
    block-size: 100%;
    h5 {
      margin: 16px 0px;
    }
  }
  .category-price {
    background-color: #fff;
    padding: 25px;
    block-size: 100%;
    h5 {
      margin: 16px 0px;
    }
    .custom-select {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding: 10px 20px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f1f1f1;
        cursor: pointer;
        width: 100%;
        outline: none; // Remove default focus styling
        margin-right: 10px;
      }

      select::-ms-expand {
        display: none; // Hide arrow in IE
      }

      select:focus {
        border-color: #19ad7b;
        box-shadow: 0 0 5px rgba(25, 173, 123, 0.5);
      }
      .plus-icon {
        font-size: 20px;
        padding: 10px;
        width: 45px;
        height: 45px;
        background-color: #19ad7b;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
      }
      .delete-cat {
        font-size: 20px;
        padding: 10px;
        width: 45px;
        height: 45px;
        background-color: #d83845;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
