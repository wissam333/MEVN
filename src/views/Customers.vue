<template>
  <div class="contain" :class="sidebar ? 'shrink' : ''">
    <div class="title-container">
      <div class="head-title">
        <h4 class="header4">Customers List</h4>
      </div>
      <div class="options">
        <div class="reload btn btn-success" @click="getCustomersTrigger()">
          <i class="bi bi-arrow-clockwise me-1"></i>Reload
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <div class="loading" v-if="getCustomersLoading">
        <img src="../../assets/loading.svg" alt="" />
      </div>
      <div v-else class="User-tabel">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr class="rows" v-for="customer in customers" :key="customer._id">
              <td>
                <p class="">
                  {{ customer.username }}
                </p>
              </td>
              <td>
                <p class="">
                  {{ customer.email }}
                </p>
              </td>

              <td>
                <span
                  class="delete"
                  @click="confirmDelete(customer._id, customer.username)"
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
        <p>Are You Sure You Want To Delete "{{ deleteUserName }}"?</p>
      </template>
      <template #footer>
        <button class="btn btn-secondary" @click="deleteModal = false">
          close
        </button>
        <button class="btn btn-danger" @click="DeleteUserTrigger()">
          Delete
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
import { golbalVar, Customers } from "../stores/counter";
import { storeToRefs } from "pinia";
const getGolbalVar = golbalVar();
const CustomersData = Customers();
const { sidebar } = storeToRefs(getGolbalVar);
const { getCustomersLoading } = storeToRefs(CustomersData);

let customers = ref([]);
// get Customers
const getCustomersTrigger = async () => {
  customers.value = await CustomersData.getCustomers();
};
onBeforeMount(() => {
  getCustomersTrigger();
});

// modal variables and function
// delete modal
let deleteModal = ref(false);
const updateDeleteModal = (value) => {
  deleteModal.value = value;
};

// delete User
let deleteUserName = ref();
let deleteUserId = ref();
let confirmDelete = (UserId, UserName) => {
  deleteUserName.value = UserName;
  deleteUserId.value = UserId;
  deleteModal.value = true;
};
let DeleteUserTrigger = async () => {
  deleteModal.value = false;
  const res = await CustomersData.deleteUser(deleteUserId.value);
  if (res.status === 200) {
    success(res.data.message);
    DeleteUserTemp();
  } else {
    faild(res.data.message);
  }
};
let DeleteUserTemp = () => {
  customers.value = customers.value.filter(
    (item) => item._id !== deleteUserId.value
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
  .User-tabel {
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
    .User-img {
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
    .User-info {
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
