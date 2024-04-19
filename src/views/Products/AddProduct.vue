<template>
  <div class="contain" :class="sidebar ? 'shrink' : ''">
    <div class="title-container">
      <div class="head-title">
        <h4>Add a new product</h4>
        <p>All Products are listed <router-link to="/">here</router-link></p>
      </div>
      <div class="mt-2">
        <button class="btn btn-success">Publish Product</button>
      </div>
    </div>

    <main>
      <form class="row gy-3">
        <div class="col-sm-12 col-lg-8">
          <div class="main-info box block-border">
            <h5>Product Information</h5>

            <div class="d-flex flex-column">
              <div class="d-flex flex-column-reverse mb-3">
                <input
                  id="title"
                  type="text"
                  required
                  maxlength="30"
                  placeholder="Coton Shirt"
                />
                <label for="title">Name</label>
              </div>

              <div class="d-flex flex-column-reverse mb-3">
                <textarea
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
            <div class="circles" :class="locale === 'ar' ? 'ar' : ''">
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
            <DragAndDrop></DragAndDrop>
          </div>
        </div>

        <div class="col-sm-12 col-lg-4">
          <div class="category-price box block-border">
            <h5>Category & Price</h5>

            <div class="d-flex flex-column">
              <div class="d-flex flex-column-reverse mb-3">
                <input
                  id="price"
                  type="number"
                  required
                  maxlength="30"
                  placeholder="Price"
                />
                <label for="price">Price</label>
              </div>

              <p>Please Select Categories</p>
              <div id="categories">
                <div class="custom-select">
                  <select>
                    <option v-for="cat in categories" :value="cat">
                      {{ cat }}
                    </option>
                  </select>
                  <div class="plus-icon" @click="addCat">
                    <i class="bi bi-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>
<script setup>
// basic imports
import { ref } from "vue";
import DragAndDrop from "../../components/DragAndDrop.vue";
// store
import { golbalVar, dashboard } from "../../stores/counter";
import { storeToRefs } from "pinia";
const getData = golbalVar();
// const getDashboard = dashboard();
const { sidebar } = storeToRefs(getData);
// const { token, states, monthlyIncrease } = storeToRefs(getDashboard);

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
let categories = ref(["Men", "Women", "Electronics"]);
const addCat = () => {
  let cats = document.getElementById("categories");
  let customSelectDiv = document.createElement("div");
  const selectHTML = categories.value
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join("");
  customSelectDiv.classList.add("custom-select");
  customSelectDiv.innerHTML = `
                <select>
                  ${selectHTML}
                </select>
                <div class="plus-icon" @click="addCat">
                  <i class="bi bi-plus"></i>
                </div>
              `;
  cats.appendChild(customSelectDiv);
};
</script>
<style lang="scss">
.contain {
  overflow-x: hidden;
  transition: all 0.3s linear;
  width: 100%;
  background-color: #f8f7fa;
  float: right;
  margin-top: 83px;
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
  form {
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
    }
  }
}
</style>
