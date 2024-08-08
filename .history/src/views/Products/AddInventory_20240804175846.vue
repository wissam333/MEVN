<template>
  <form
    class="contain"
    :class="sidebar ? 'shrink' : ''"
    @submit.prevent="addProduct"
  >
    <div class="title-container">
      <div class="head-title">
        <h4 class="header4">Add products to inventory</h4>
        <p>
          All Products in inventory are listed
          <router-link to="/HomeView/ListProduct"> here</router-link>
        </p>
      </div>
      <div class="mt-2">
        <input type="submit" value="Add To Inventory" class="btn btn-success" />
      </div>
    </div>

    <main>
      <div class="form row gy-3">
        <div class="col-sm-12 col-lg-8">
          <div class="main-info box block-border">
            <h5>Inventory Information</h5>

            <div class="d-flex flex-column">
              <div
                id="dropProduct"
                class="search_field d-flex flex-column-reverse mb-3"
              >
                <input
                  v-model="searchTerm"
                  class="Commercial-name mr-sm-2"
                  type="search"
                  style="padding-left: 30px"
                  placeholder="Product"
                  autocomplete="off"
                  @click="closeSearch = true"
                  required
                />
                <label for="title">Product</label>
                <i
                  class="bi bi-caret-down-fill"
                  @click="closeSearch = !closeSearch"
                ></i>

                <ul class="autoSearch" v-if="closeSearch">
                  <li class="results-count">
                    Showing {{ searchProducts.length }} of
                    {{ Products.length }} results
                  </li>
                  <hr />
                  <li
                    v-for="product in searchProducts"
                    :key="product.id"
                    @click="
                      chooseProduct(product.name);
                      searchTerm = product.name;
                      closeSearch = false;
                    "
                  >
                    {{ product.name }}
                  </li>
                </ul>
              </div>

              <div class="d-flex flex-column-reverse mb-3">
                <input
                  maxlength="6"
                  min="0"
                  v-model="qty"
                  id="qty"
                  type="number"
                  required
                  autocomplete="off"
                  placeholder="Product Quantity"
                />
                <label for="title">Quantity</label>
              </div>

              <div class="d-flex flex-column-reverse mb-3">
                <input
                  maxlength="6"
                  min="0"
                  v-model="threshold"
                  id="qty"
                  type="number"
                  required
                  autocomplete="off"
                  placeholder="Product Threshold"
                />
                <label for="title">Threshold</label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-lg-4">
          <div class="warehouse main-info box block-border">
            <p>All products are stored in Tartous warehouse</p>
            <img src="../../assets/Warehouse.G03.watermarked.2k.png" alt="" />
          </div>
        </div>
      </div>
    </main>
  </form>
</template>
<script setup>
// basic imports
import { ref, onBeforeMount, computed, onMounted } from "vue";
// store
import { product, golbalVar } from "../../stores/counter";
import { storeToRefs } from "pinia";
const getGolbalVar = golbalVar();
const { sidebar } = storeToRefs(getGolbalVar);
const productAPI = product();
// toast imports
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

let Products = ref([]);
// get Products
const getProductsTrigger = async () => {
  Products.value = await productAPI.getProductsTemp();
};
onBeforeMount(() => {
  getProductsTrigger();
});

// search product
let closeSearch = ref(false);
let searchTerm = ref("");
const searchProducts = computed(() => {
  if (searchTerm.value === "") {
    return Products.value.filter((product) => {
      return product;
    });
  }
  let matches = 0;
  return Products.value.filter((product) => {
    if (
      product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      matches < 10
    ) {
      matches++;
      return product;
    }
  });
});

// get product id when chosing
let productId = ref();
let productIdGetter = ref();
let chooseProduct = (name) => {
  productIdGetter.value = name;
  Products.value.filter((product) => {
    if (product.name === productIdGetter.value) {
      productId.value = product.id;
    }
  });
};

// close search when clicking outside the dropdown
const handleClickOutsideProduct = (event) => {
  const dropProduct = document.getElementById("dropProduct");
  if (dropProduct) {
    if (!dropProduct.contains(event.target) && dropProduct !== event.target) {
      closeSearch.value = false;
    }
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutsideProduct);
});

// var
let qty = ref();
let threshold = ref();
let productData = ref();
// add to inventory
const addProduct = async () => {
  productData.value = {
    productId: productId.value,
    quantity: qty.value,
    reorderThreshold: threshold.value,
  };

  const res = await productAPI.addToInventory(productData.value);
  console.log(res);
  if (res.status === 201 || res.status === 200) {
    success();
  } else {
    faild(res.data.message);
  }
  // restore default input fields
  productId.value = "";
  qty.value = 0;
  threshold.value = 0;
  searchTerm.value = "";
  productIdGetter.value = "";
};

// Toast Management
const $toast = useToast();
let success = () => {
  $toast.success("Products Added Successfully", {
    position: "bottom-right",
  });
};
let faild = (message) => {
  $toast.error(message.substring(0, 1).toUpperCase() + message.substring(1), {
    position: "bottom-right",
  });
};
</script>
<style lang="scss" scoped>
.search_field {
  position: relative;

  @media (max-width: 425px) {
    width: 100%;
    &:nth-child(1) {
      margin-right: 0px;
    }
  }

  i {
    position: absolute;
    padding: 10px 0px 5px 9px;
    min-width: 30px;
    top: 0;
    left: 0;
    right: auto;
  }

  .autoSearch {
    border-radius: 8px;
    position: absolute;
    background-color: #17d092;
    max-height: 200px;
    color: #fff;
    overflow-y: scroll;
    padding: 10px;
    margin: 0;
    top: 38px;
    z-index: 2;

    .results-count {
      font-weight: bold;
    }

    hr {
      margin: 10px 0;
    }

    li {
      padding: 5px 10px;
      margin-bottom: 5px;
      border-radius: 8px;

      &:not(:nth-child(1)):hover {
        background-color: #168560;
        cursor: pointer;
      }
    }
  }
}
.warehouse {
  img {
    width: 100%;
  }
}
</style>
