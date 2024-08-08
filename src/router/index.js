import { createRouter, createWebHistory } from "vue-router";

import SignIn from "../views/SignIn.vue";
import HomeView from "../views/AppHome.vue";
import Dashboard from "../views/Dashboard.vue";
import AddProduct from "../views/Products/AddProduct.vue";
import ListProduct from "../views/Products/ListProducts.vue";
import ProductInfo from "../views/Products/ProductInfo.vue";
import AddInventory from "../views/Products/AddInventory.vue";
import ListInventory from "../views/Products/ListInventory.vue";
import Customers from "../views/Customers.vue";
import Orders from "../views/Orders.vue";

import ForbiddenRoute from "../views/ForbiddenRoute.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      name: "ForbiddenRoute",
      path: "/ForbiddenRoute",
      component: ForbiddenRoute,
    },
    {
      name: "NotFound",
      path: "/NotFound",
      component: NotFound,
    },
    {
      path: "/",
      name: "SignIn",
      component: SignIn,
    },
    {
      path: "/HomeView",
      name: "HomeView",
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "Dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "AddProduct",
          name: "AddProduct",
          component: AddProduct,
        },
        {
          path: "ListProduct",
          name: "ListProduct",
          component: ListProduct,
        },
        {
          path: "ProductInfo/:productId",
          name: "ProductInfo",
          component: ProductInfo,
        },
        {
          path: "AddInventory",
          name: "AddInventory",
          component: AddInventory,
        },
        {
          path: "ListInventory",
          name: "ListInventory",
          component: ListInventory,
        },
        {
          path: "Customers",
          name: "Customers",
          component: Customers,
        },
        {
          path: "Orders",
          name: "Orders",
          component: Orders,
        },
      ],
    },
    // Catch-all route for invalid routes, redirect to ForbiddenRoute
    {
      path: "/:catchAll(.*)",
      redirect: "/NotFound",
    },
  ],
});

// Vue Router guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const success = localStorage.getItem("success");
    if (!success) {
      // Redirect to login if token is not present
      next("/ForbiddenRoute");
    } else {
      // User has token, allow access
      next();
    }
  } else {
    // Route doesn't require auth, allow access
    next();
  }
});

export default router;
