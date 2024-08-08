<template>
  <div class="nav-container">
    <nav>
      <div class="left-section">
        <div class="logo">
          <img src="../assets/logo.svg" alt="Logo" />
        </div>
        <div class="navbar-collapse-button" @click="sidebar = !sidebar">
          <span :class="sidebar ? 'open' : ''"></span>
          <span :class="sidebar ? 'open' : ''"></span>
          <span :class="sidebar ? 'open' : ''"></span>
        </div>
      </div>
      <div class="right-section">
        <div class="user">
          <div class="user-img">
            <img src="../assets/admin.png" alt="" />
          </div>
          <div class="user-name">
            <h5>Joun Doe</h5>
            <p>good morning</p>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div class="sidebar box" :class="sidebar ? '' : 'open'">
    <ul class="main-links">
      <router-link to="/HomeView/Dashboard">
        <li
          :class="activeLink == 'Dashboard' ? 'active' : ''"
          @click="productDropDown = false"
        >
          <i class="bi bi-bar-chart-line"></i>
          <span>Dashboard</span>
        </li>
      </router-link>

      <li
        @click="
          productDropDown = !productDropDown;
          activeLink = 'Products';
        "
        class="d-flex align-items-center justify-content-between"
        :class="activeLink == 'Products' ? 'active' : ''"
      >
        <div>
          <i class="bi bi-basket"></i>
          <span>Products</span>
        </div>
        <i
          class="bi bi-caret-right-fill d-flex align-items-center justify-content-center"
          :class="productDropDown ? 'active' : ''"
        ></i>
      </li>
      <!-- dropdown for products -->
      <ul class="second-links" :class="productDropDown ? 'showLink' : ''">
        <router-link to="/HomeView/AddProduct">
          <li :class="subActiveLink == 'AddProducts' ? 'sub-active' : ''">
            <i class="bi bi-plus-circle"></i>
            <span>Add Product</span>
          </li>
        </router-link>

        <router-link to="/HomeView/ListProduct">
          <li :class="subActiveLink == 'ListProducts' ? 'sub-active' : ''">
            <i class="bi bi-list-ul"></i>
            <span>Products List</span>
          </li>
        </router-link>

        <router-link to="/HomeView/AddInventory">
          <li :class="subActiveLink == 'AddInventory' ? 'sub-active' : ''">
            <i class="bi bi-tags"></i>
            <span>Add Inventory</span>
          </li>
        </router-link>

        <router-link to="/HomeView/ListInventory">
          <li :class="subActiveLink == 'ListInventory' ? 'sub-active' : ''">
            <i class="bi bi-tags"></i>
            <span>Inventory List</span>
          </li>
        </router-link>
      </ul>

      <router-link to="/HomeView/Customers">
        <li
          :class="activeLink == 'Customers' ? 'active' : ''"
          @click="productDropDown = false"
        >
          <i class="bi bi-people"></i>
          <span>Customers</span>
        </li>
      </router-link>

      <router-link to="/HomeView/Orders">
        <li
          :class="activeLink == 'Orders' ? 'active' : ''"
          @click="productDropDown = false"
        >
          <i class="bi bi-cash-coin"></i>
          <span>Orders</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
// basic imports
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
// store
import { golbalVar } from "../stores/counter";
import { storeToRefs } from "pinia";
const getData = golbalVar();
const { sidebar, activeLink, subActiveLink } = storeToRefs(getData);

// variables
let productDropDown = ref(false);

// Watch for route changes and update activeTap accordingly
const route = useRoute();
watchEffect(() => {
  if (route.path.includes("/HomeView/Dashboard")) {
    subActiveLink.value = "";
    productDropDown.value = false;
    activeLink.value = "Dashboard";
  } else if (route.path.includes("/HomeView/AddProduct")) {
    subActiveLink.value = "AddProducts";
    activeLink.value = "Products";
    productDropDown.value = true;
  } else if (route.path.includes("/HomeView/ListProduct")) {
    subActiveLink.value = "ListProducts";
    productDropDown.value = true;
    activeLink.value = "Products";
  } else if (route.path.includes("/HomeView/Dashboard")) {
    subActiveLink.value = "";
    productDropDown.value = false;
    activeLink.value = "Category";
  } else if (route.path.includes("/HomeView/ProductInfo")) {
    subActiveLink.value = "ListProducts";
    productDropDown.value = true;
    activeLink.value = "Products";
  } else if (route.path.includes("/HomeView/AddInventory")) {
    subActiveLink.value = "AddInventory";
    productDropDown.value = true;
    activeLink.value = "Products";
  } else if (route.path.includes("/HomeView/ListInventory")) {
    subActiveLink.value = "ListInventory";
    productDropDown.value = true;
    activeLink.value = "Products";
  }else if (route.path.includes("/HomeView/Orders")) {
    subActiveLink.value = "";
    productDropDown.value = false;
    activeLink.value = "Orders";
  }else if (route.path.includes("/HomeView/Customers")) {
    subActiveLink.value = "";
    productDropDown.value = false;
    activeLink.value = "Customers";
  }
});
</script>

<style lang="scss" scoped>
.nav-container {
  position: fixed;
  z-index: 10000;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 20px;
    width: 100vw;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    .left-section {
      display: flex;
      align-items: center;

      .logo {
        cursor: pointer;
        img {
          width: 150px;
          @media (max-width: 600px) {
            width: 100px;
          }
        }
      }
      .navbar-collapse-button {
        margin-left: 20px;
        width: 34px;
        height: 34px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        cursor: pointer;
        @media (max-width: 600px) {
          width: 25px;
          height: 25px;
          margin-left: 8px;
        }

        span {
          display: block;
          background-color: #003d29;
          width: 100%;
          height: 4px;
          border-radius: 24px;
          transition: all 0.3s linear;
          &.open {
            &:nth-child(1) {
              transform: translateY(3px) rotate(-45deg);
              width: 16px;
              @media (max-width: 600px) {
                width: 10px;
                transform: translateY(4px) rotate(-45deg);
              }
            }
            &:nth-child(2) {
              transform: translateX(0px);
            }
            &:nth-child(3) {
              width: 16px;
              transform: translateY(-4px) rotate(45deg);
              @media (max-width: 600px) {
                transform: translateY(-4px) rotate(45deg);
                width: 10px;
              }
            }
          }
        }
      }
    }
    .user {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .user-img {
        img {
          width: 50px;
          border-radius: 50%;
          @media (max-width: 600px) {
            width: 30px;
          }
        }
      }
      .user-name {
        padding-right: 16px;
        @media (max-width: 600px) {
          padding-right: 5px;
        }
        h5,
        p {
          margin: 5px;
          @media (max-width: 600px) {
            margin: 0px;
          }
        }
        p {
          font-size: 14px;
          font-style: italic;
          color: #6d6a77;
        }
        @media (max-width: 600px) {
          p {
            font-size: 12px;
          }
          h5 {
            font-size: 14px;
          }
        }
      }
    }
  }
}

// sidebar
.sidebar {
  background-color: #fff;
  width: 260px;
  position: fixed;
  top: 77.6px;
  bottom: 0;
  left: 0;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  transition: all 0.3s linear;
  z-index: 5;

  @media (max-width: 600px) {
    top: 55px;
  }
  &.open {
    transform: translateX(-260px);
  }
  .main-links,
  .second-links {
    list-style: none;
    margin: 0;
    padding: 10px;
    li {
      background-color: #fff;
      color: #333;
      font-weight: 400;
      font-size: 16px;
      margin: 5px 0;
      padding: 10px 4px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s linear;
      &.active {
        color: #fff;
        background: linear-gradient(118deg, #047751, #0dab77);
      }
      i {
        padding: 10px;
        font-size: 20px;
        height: 20px;
        transition: all 0.3s linear;
        &.active {
          transform: rotate(90deg);
        }
      }
    }
  }
  .second-links {
    transition: all 0.3s linear;
    height: 0;
    overflow: hidden;
    padding: 0px 10px;
    li {
      &.sub-active {
        color: #fff;
        background: linear-gradient(118deg, #035d3f, #158862);
      }
      i {
        font-size: 16px;
      }
    }
    &.showLink {
      height: 214px;
      padding-top: 10px;
    }
  }
}
</style>
