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
      <li
        :class="activeLink == 'Dashboard' ? 'active' : ''"
        @click="activeLink = 'Dashboard'"
      >
        <i class="bi bi-bar-chart-line"></i>
        <span>Dashboard</span>
      </li>
      <li
        :class="activeLink == 'Products' ? 'active' : ''"
        @click="activeLink = 'Products'"
      >
        <i class="bi bi-basket"></i>
        <span>Products</span>
      </li>
      <li
        :class="activeLink == 'Customers' ? 'active' : ''"
        @click="activeLink = 'Customers'"
      >
        <i class="bi bi-people"></i>
        <span>Customers</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
//store
import { golbalVar } from "../stores/counter";
import { storeToRefs } from "pinia";
const getData = golbalVar();
const { sidebar, activeLink } = storeToRefs(getData);
//end store
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
  top: 83px;
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
  .main-links {
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
      }
    }
  }
}
</style>
