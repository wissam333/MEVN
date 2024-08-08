<template>
  <form
    class="contain"
    :class="sidebar ? 'shrink' : ''"
    @submit.prevent="updateProductTrigger()"
  >
    <div>
      <div class="title-container">
        <div class="head-title">
          <router-link to="/HomeView/ListProduct" class="back-icon">
            <i class="bi bi-arrow-left-square-fill"></i>
          </router-link>
          <p>List Products / {{ title }}</p>
        </div>
        <div class="options">
          <input type="submit" value="Update Product" class="btn btn-success" />
        </div>
      </div>
      <div class="product box block-border">
        <div class="product-img" @drop="handleDrop" @dragover.prevent>
          <div class="upload" v-if="previewImage == null">
            <label for="photo-upload">
              <i class="bi bi-upload"></i>
            </label>
            <input
              autocomplete="off"
              class="form-control"
              id="photo-upload"
              type="file"
              accept="image/*"
              style="display: none"
              @change="uploadImage"
            />
          </div>
          <div v-else>
            <i
              @click="previewImage = null"
              class="bi bi-x-circle-fill close-img"
            ></i>
          </div>
          <img v-if="previewImage == null" :src="img" alt="" />
          <img v-else :src="previewImage" alt="" />
        </div>

        <div class="product-info">
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
              rows="4"
              required
              minlength="30"
              placeholder="very good Coton Shirt"
            ></textarea>
            <label for="description">Description</label>
          </div>
          <div class="d-flex flex-column-reverse mb-5">
            <input
              v-model="price"
              id="price"
              type="number"
              required
              maxlength="6"
              min="0"
              step="0.01"
              placeholder="Price"
            />
            <label for="price">Price</label>
          </div>

          <p>Colors :</p>
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

          <p>Sizes :</p>
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

          <p>Categories :</p>
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
              <i class="bi bi-trash3 ms-2" @click="deleteCat(activeCat)"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="product-state box block-border">
        <div class="statistics-numbers">
          <div class="item">
            <div class="desc">
              <p>All Sales</p>
              <h3>
                ${{
                  productState?.totalRevenueAll
                    ? productState?.totalRevenueAll
                    : "0"
                }}
              </h3>
              <h5>
                {{
                  productState?.totalQuantitySoldAll
                    ? productState?.totalQuantitySoldAll
                    : "0"
                }}
                {{
                  productState?.totalQuantitySoldAll == 1 ||
                  productState?.totalQuantitySoldAll == 0
                    ? "Product"
                    : "Products"
                }}
              </h5>
            </div>
          </div>

          <div class="item">
            <div class="desc">
              <p>Sales By Month</p>
              <h3>
                ${{
                  productState?.totalRevenueMonth
                    ? productState?.totalRevenueMonth
                    : "0"
                }}
              </h3>
              <h5>
                {{
                  productState?.totalQuantitySoldMonth
                    ? productState?.totalQuantitySoldMonth
                    : "0"
                }}
                {{
                  productState?.totalQuantitySoldMonth == 1 ||
                  productState?.totalQuantitySoldMonth == 0
                    ? "Product"
                    : "Products"
                }}
              </h5>
            </div>
          </div>
          <div class="item">
            <div class="desc">
              <p>Sales By Week</p>
              <h3>
                ${{
                  productState?.totalRevenueWeek
                    ? productState?.totalRevenueWeek
                    : "0"
                }}
              </h3>
              <h5>
                {{
                  productState?.totalQuantitySoldWeek
                    ? productState?.totalQuantitySoldWeek
                    : "0"
                }}
                {{
                  productState?.totalQuantitySoldWeek == 1 ||
                  productState?.totalQuantitySoldWeek == 0
                    ? "Product"
                    : "Products"
                }}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="product-state box block-border">
        <ProductChart></ProductChart>
      </div>
    </div>
  </form>
</template>
<script setup>
// basic imports
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import ProductChart from "../../components/charts/ProductChart.vue";
// dashboard store
import { dashboard } from "../../stores/counter";
const getChartsData = dashboard();
// golbalVar store
import { golbalVar, product } from "../../stores/counter";
import { storeToRefs } from "pinia";
const getGolbalVar = golbalVar();
const ProductsData = product();
const { sidebar } = storeToRefs(getGolbalVar);
// toast imports
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
// router
const route = useRoute();

// variables
let singleItem = ref({});
let productState = ref();
let activeColor = ref([]);
let activeSize = ref([]);
let activeCategories = ref([]);
let title = ref("");
let desc = ref("");
let price = ref(0);
let img = ref("");
let categories = ref(["Women", "Electronics", "Men"]);

// getting product info and prodcut state
onBeforeMount(async () => {
  // product state
  productState.value = await getChartsData.getSalesDataForProduct(
    route.params.productId
  );
  // product info
  singleItem.value = await ProductsData.getProduct(route.params.productId);
  activeColor.value = singleItem.value.color;
  activeSize.value = singleItem.value.size;
  activeCategories.value = singleItem.value.categories;
  title.value = singleItem.value.title;
  desc.value = singleItem.value.desc;
  price.value = singleItem.value.price;
  img.value = singleItem.value.img;
  // categories handling
  categories.value = categories.value.filter(
    (cat) => !singleItem.value.categories.includes(cat)
  );
});

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

let updateData = ref();
// update product
const updateProductTrigger = async () => {
  updateData.value = {
    title: title.value,
    desc: desc.value,
    price: price.value,
    color: activeColor.value,
    size: activeSize.value,
    categories: activeCategories.value,
    img: itemImg.value ? itemImg.value : img.value,
  };
  const res = await ProductsData.updateProduct(
    route.params.productId,
    updateData.value
  );
  if (res.title) {
    success();
  } else {
    faild(res.data.message);
  }
};

// edit image
let previewImage = ref();
let itemImg = ref();
// Maximum file size in megabytes
const MAX_FILE_SIZE_MB = 2;

const uploadImage = (e) => {
  const image = e.target.files[0];
  if (image && image.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
    itemImg.value = image;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    successImage();
  } else {
    faildImage(
      `Image size exceeds the maximum allowed (${MAX_FILE_SIZE_MB}MB). Please select a smaller image.`
    );
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const image = event.dataTransfer.files[0];
  if (image && image.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
    itemImg.value = image;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    successImage();
  } else {
    faildImage(
      `Image size exceeds the maximum allowed (${MAX_FILE_SIZE_MB}MB). Please select a smaller image.`
    );
  }
};

// Toast Management
const $toast = useToast();
let success = () => {
  $toast.success("Product Updated Successfully", {
    position: "bottom-right",
  });
};
let faild = (message) => {
  $toast.error(message.substring(0, 1).toUpperCase() + message.substring(1), {
    position: "bottom-right",
  });
};
// Toast Management
let faildImage = (message) => {
  $toast.error(message, {
    position: "bottom-right",
  });
};
let successImage = () => {
  $toast.success("Image uploded successfully", {
    position: "bottom-right",
  });
};
</script>
<style lang="scss" scoped>
.contain {
  position: relative;
  overflow-x: hidden;
  min-height: calc(100vh - 77.6px);
  transition: all 0.3s linear;
  width: 100%;
  background-color: #f8f7fa;
  float: right;
  margin-top: 77.6px;
  padding: 16px;
  @media (max-width: 600px) {
    margin-top: 55px;
    min-height: calc(100vh - 55px);
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
      display: flex;
      align-items: center;
      p {
        font-size: 20px;
        color: #6d6a77;
        a {
          color: #19ad7b;
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          font-size: 20px;
        }
      }
      i {
        font-size: 30px;
        margin-right: 16px;
        color: #19ad7b;
      }
    }
    .options {
      .save {
        background-color: #19ad7b;
        color: #fff;
        border: none;
      }
      @media (max-width: 991px) {
        margin-top: 10px;
      }
    }
  }
  .product {
    display: flex;
    background-color: #fff;
    @media (max-width: 991px) {
      flex-direction: column;
    }
    .product-img {
      position: relative;
      width: 50%;
      transition: all 0.3s linear;
      height: calc(100vh - 185px);
      @media (max-width: 991px) {
        width: 100%;
        height: auto;
      }
      .close-img {
        position: absolute;
        top: 36px;
        left: 20px;
        background-color: #0dab77;
        border-radius: 8px;
        color: #fff;
        padding: 10px 15px;
      }
      .upload {
        position: absolute;
        top: 36px;
        left: 20px;
        background-color: #0dab77;
        border-radius: 8px;
        color: #fff;
        label {
          cursor: pointer;
          padding: 10px 15px;
          i {
            width: 20px;
            height: 20px;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 8px;
        margin: 16px 0px;
        @media (max-width: 600px) {
          width: 100%;
        }
      }
    }
    .product-info {
      width: 50%;
      padding: 20px;
      margin: 16px 0px;
      @media (max-width: 991px) {
        width: 100%;
      }
      .price {
        color: #008176;
        font-size: 18px;
        font-weight: 700;
        margin-top: 20px;
      }
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
  .product-state {
    margin-top: 16px;
    background-color: #fff;
    .statistics-numbers {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .item {
        display: flex;
        box-shadow: none;
        margin: 10px;
        padding: 10px;
        @media (max-width: 768px) {
          flex: 1 0 calc(50% - 5px);
        }

        .desc {
          p {
            font-size: 16px;
            color: #6d6a77;
            margin-bottom: 10px;
          }
          h5 {
            color: #434050;
            @media (max-width: 600px) {
              font-size: 16px;
            }
          }
          h3 {
            color: #606060;
            margin-bottom: 10px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
