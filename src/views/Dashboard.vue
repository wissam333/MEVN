<template>
  <div class="contain" :class="sidebar ? 'shrink' : ''">
    <!-- <h5>Dashboard /</h5>
    <hr /> -->
    <main>
      <section class="dashboard-badges row">
        <div class="col-sm-12 col-lg-4">
          <div class="congratulations box block-border">
            <img
              src="../assets/download (1).png"
              class="congratulations-img-left"
              width="150"
            />
            <img
              src="../assets/download.png"
              class="congratulations-img-right"
              width="150"
            />
            <div class="congratulations-content">
              <h4>
                Congratulations
                <span style="color: #ff9fad; font-weight: 600">{{ name }}</span>
              </h4>
              <p>You have done <strong>57.6%</strong> more sales today.</p>
              <button class="btn btn-success">View Sales</button>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-lg-8">
          <div class="statistics box block-border">
            <div class="d-flex align-items-center justify-content-between">
              <h4>Statistics</h4>
              <p class="update">Updates daily</p>
            </div>

            <div class="statistics-numbers">
              <div class="item sales">
                <div class="icon"><i class="bi bi-cash-stack"></i></div>
                <div class="desc">
                  <h5>${{ states.totalSales }}</h5>
                  <p>Sales</p>
                </div>
              </div>
              <div class="item customers">
                <div class="icon"><i class="bi bi-people"></i></div>
                <div class="desc">
                  <h5>{{ states.users }}</h5>
                  <p>Customers</p>
                </div>
              </div>
              <div class="item orders">
                <div class="icon"><i class="bi bi-cart-check"></i></div>
                <div class="desc">
                  <h5>{{ states.ordersCount }}</h5>
                  <p>Orders</p>
                </div>
              </div>
              <div class="item products">
                <div class="icon"><i class="bi bi-box-seam"></i></div>
                <div class="desc">
                  <h5>{{ states.productsCount }}</h5>
                  <p>Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-sm-12 col-lg-4">
          <div class="medal card anim1">
            <h5>Congratulations 🎉 {{ name }}!</h5>
            <p>You have won gold medal</p>
            <h3>$48.9k</h3>
            <button class="btn btn-success" style="background-color: #ed8f9d">
              View Sales
            </button>
            <img
              src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/congo-illustration-i9qbJLbF.png"
              alt="Medal Pic"
              class="congratulation-medal"
            />
          </div>
        </div> -->
      </section>
      <section class="barChart box block-border">
        <apexchart></apexchart>
      </section>
    </main>
  </div>
</template>

<script setup>
import apexchart from "../components/charts/apexCharts.vue";
//store
import { golbalVar, dashboard } from "../stores/counter";
import { storeToRefs } from "pinia";
const getData = golbalVar();
const getDashboard = dashboard();
const { sidebar } = storeToRefs(getData);
const { states } = storeToRefs(getDashboard);
//end store
</script>

<style lang="scss" scoped>
// h5 {
//   padding-top: 16px;
//   font-weight: 600;
// }
// hr {
//   margin-bottom: 25px;
// }
.contain {
  overflow-x: hidden;
  transition: all 0.3s linear;
  width: 100%;
  background-color: #f8f7fa;
  float: right;
  margin-top: 83px;
  padding-top: 16px;
  @media (max-width: 600px) {
    margin-top: 55px;
  }

  &.shrink {
    width: calc(100% - 260px); /* 100% + 260px(sidebar)*/
    @media (max-width: 600px) {
      width: 100%;
    }
  }

  .bar-chart {
    margin-top: 20px;
  }
}

.congratulations {
  position: relative;
  background: linear-gradient(118deg, #003d29, #047751);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  padding: 25px;
  block-size: 100%;

  .congratulations-img-right {
    position: absolute;
    top: 0;
    right: 0;
    @media (max-width: 475px) {
      display: none;
    }
  }
  .congratulations-img-left {
    transform: scaleX(-1);
    position: absolute;
    top: 0;
    left: 0;
  }
  .congratulations-content {
    h4 {
      position: relative;
      margin: 16px 0px;
      color: #fff;
    }
    button {
      margin-top: 16px;
    }
  }
}
.statistics {
  background-color: #fff;
  color: #fff;
  padding: 25px;
  block-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h4 {
    position: relative;
    margin: 16px 0px;
    color: #000;
  }
  .update {
    font-size: 13px;
    color: #6d6a77;
  }
  .statistics-numbers {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      display: flex;
      box-shadow: none;
      margin-top: 10px;
      @media (max-width: 768px) {
        flex: 1 0 calc(50% - 5px);
      }

      .icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin-right: 10px;
        i {
          font-size: 23px;
        }
      }
      .desc {
        p {
          font-size: 13px;
          color: #6d6a77;
          font-style: italic;
        }
        h5 {
          color: #434050;
        }
      }
      &.sales {
        .icon {
          color: #2dc973;
          background-color: #2dc97382;
        }
      }
      &.orders {
        .icon {
          color: #7367f0;
          background-color: #7267f083;
        }
      }
      &.customers {
        .icon {
          color: #00bad0;
          background-color: #00bbd07b;
        }
      }
      &.products {
        .icon {
          color: #ff4c51;
          background-color: #ff4c527b;
        }
      }
    }
  }
}
.barChart {
  background-color: #fff;
  margin-top: 16px;
}
</style>
