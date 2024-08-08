<template>
  <div class="contain" :class="sidebar ? 'shrink' : ''">
    <div class="title-container">
      <div class="head-title">
        <h4 class="header4">Inventories List</h4>
        <p>
          Add to Inventory from
          <router-link to="/HomeView/AddProduct">here</router-link>
        </p>
      </div>
      <div class="options">
        <div class="reload btn btn-success" @click="getInventoriesTrigger()">
          <i class="bi bi-arrow-clockwise me-1"></i>Reload
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <div class="loading" v-if="getInventoriesLoading">
        <img src="../../assets/loading.svg" alt="" />
      </div>
      <div v-else class="product-tabel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Reserved</th>
              <th>Threshold</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="rows"
              v-for="inventory in Inventories"
              :key="inventory._id"
            >
              <td class="d-flex align-items-center">
                <div
                  class="product-img"
                  @click="
                    showImage = inventory.productDetails.img;
                    showModal = true;
                  "
                >
                  <img
                    v-if="inventory.productDetails.img"
                    :src="inventory.productDetails.img"
                    alt=""
                  />
                  <img v-else src="../../assets/App icon.png" alt="" />
                </div>
                <div class="product-info d-flex flex-column align-items-start">
                  <h5>{{ inventory.productDetails.title }}</h5>
                </div>
              </td>

              <td>
                <p class="badge rounded-pill bg-primary">
                  {{ inventory.stockQuantity }}
                </p>
              </td>
              <td>
                <p class="badge rounded-pill bg-danger">
                  {{ inventory.reservedQuantity }}
                </p>
              </td>
              <td>
                <p class="badge rounded-pill bg-info">
                  {{ inventory.reorderThreshold }}
                </p>
              </td>
              <td>
                <span
                  class="delete"
                  @click="
                    confirmDelete(
                      inventory.productId,
                      inventory.productDetails.title
                    )
                  "
                >
                  <i class="bi bi-trash3"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- delete modal -->
    <AppModal :isOpen="deleteModal" @updateIsOpen="updateDeleteModal">
      <template #header>
        <h4>Delete Confirmation</h4>
      </template>
      <template #content>
        <p>Are You Sure You Want To Delete "{{ deleteProductName }}"?</p>
      </template>
      <template #footer>
        <button class="btn btn-secondary" @click="deleteModal = false">
          close
        </button>
        <button class="btn btn-danger" @click="DeleteProductTrigger()">
          Delete
        </button>
      </template>
    </AppModal>

    <!-- show modal -->
    <AppModal :isOpen="showModal" @updateIsOpen="updateShowModal">
      <template #header></template>
      <template #content>
        <img :src="showImage" alt="" style="width: 100%" />
      </template>
      <template #footer>
        <button class="btn btn-secondary" @click="showModal = false">
          close
        </button>
      </template>
    </AppModal>
  </div>
</template>
<script setup>
// basic import
import { onBeforeMount, ref, watchEffect } from "vue";
import AppModal from "@/components/AppModal.vue";
// toast imports
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
// store
import { golbalVar, product } from "../../stores/counter";
import { storeToRefs } from "pinia";
const getGolbalVar = golbalVar();
const InventoriesData = product();
const { sidebar } = storeToRefs(getGolbalVar);
const { getInventoriesLoading } = storeToRefs(InventoriesData);

let Inventories = ref([]);
// get Inventories
const getInventoriesTrigger = async () => {
  Inventories.value = await InventoriesData.getInventories();
};
onBeforeMount(() => {
  getInventoriesTrigger();
});

// modal variables and function
// delete modal
let deleteModal = ref(false);
const updateDeleteModal = (value) => {
  deleteModal.value = value;
};
// show image modal
let showImage = ref();
let showModal = ref(false);
const updateShowModal = (value) => {
  showModal.value = value;
};

// delete product
let deleteProductName = ref();
let deleteProductId = ref();
let confirmDelete = (ProductId, productName) => {
  deleteProductName.value = productName;
  deleteProductId.value = ProductId;
  deleteModal.value = true;
};
let DeleteProductTrigger = async () => {
  deleteModal.value = false;
  const res = await InventoriesData.deleteInventory(deleteProductId.value);
  if (res.status === 200) {
    success(res.data.message);
    DeleteProductTemp();
  } else {
    faild(res.data.message);
  }
};
let DeleteProductTemp = () => {
  Inventories.value = Inventories.value.filter(
    (item) => item.productId !== deleteProductId.value
  );
};

// Toast Management
const $toast = useToast();
let success = (message) => {
  $toast.success(message.substring(0, 1).toUpperCase() + message.substring(1), {
    position: "bottom-right",
    duration: 5000,
  });
};
let faild = (message) => {
  $toast.error(message.substring(0, 1).toUpperCase() + message.substring(1), {
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
      p {
        font-size: 15px;
        color: #6d6a77;
        a {
          color: #19ad7b;
          text-decoration: underline;
        }
      }
    }
    .options {
      .reload {
        background-color: #19ad7b;
        color: #fff;
        border: none;
      }
      @media (max-width: 991px) {
        margin-top: 10px;
      }
    }
  }
  .table-responsive {
    background-color: #fff;
    border-radius: 8px;
  }
  .product-tabel {
    height: calc(100vh - 274px);
    overflow-y: scroll;
    @media (max-width: 991px) {
      height: calc(100vh - 320px);
    }
  }
  .loading {
    img {
      width: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  thead,
  tbody,
  tfoot,
  tr,
  td,
  th {
    padding: 8px 15px;
    white-space: nowrap;
    text-align: left;
  }
  table {
    width: 100%;
  }
  thead {
    background-color: #19ad7b;
    color: #fff;
  }
  td {
    color: #333;
    max-width: 300px;
    cursor: pointer;
  }
  .pagination {
    select {
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      color: #333;
      padding: 10px;
      &:focus,
      :focus-visible {
        outline: none;
      }
    }
    .page-item {
      .page-link {
        cursor: pointer;
        border: none !important;
        span {
          color: #6b7280;
          padding: 0.5rem 1rem;
          @media (max-width: 768px) {
            padding: 0;
          }
        }
        &.page-num {
          color: #19ad7b;
        }
      }
    }
    .show-info {
      @media (max-width: 520px) {
        display: none !important;
      }
    }
  }

  .rows {
    color: #000;
    &:nth-child(even) {
      background-color: #eee;
    }
    &:nth-child(odd) {
      background-color: #fff;
    }
    .product-img {
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
    .product-info {
      h5,
      p {
        max-width: 200px;
        /* will make [...] at the end */
        text-overflow: ellipsis;
        /* paragraph to one line */
        white-space: nowrap;
        /* older browsers */
        overflow: hidden;
      }
      p {
        font-size: 14px;
      }
    }
    .badge {
      font-size: 13px;
      padding: 8px 12px;
    }
    .circle {
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 1px solid #cbc9c9;
    }
    .delete,
    .edit {
      padding: 6px;
      i {
        font-size: 20px;
        color: #333;
      }
    }
  }
}
</style>
