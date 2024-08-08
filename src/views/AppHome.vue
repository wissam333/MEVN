<template>
  <div class="home">
    <AppNavbar></AppNavbar>
    <RouterView v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>
<script setup>
import AppNavbar from "../components/AppNavbar.vue";
</script>
<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.4s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
