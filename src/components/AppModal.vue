<template>
  <div class="root">
    <teleport to="#modals">
      <div class="wrapper" :class="isOpen ? 'active' : ''"></div>
      <transition name="fade" mode="out-in">
        <div class="modal" v-if="isOpen" @click="updateIsOpen(false)">
          <div @click.stop>
            <div class="modal-header">
              <slot name="header" class="modal-header"></slot>
              <i class="bi bi-x-lg" @click="updateIsOpen(false)"></i>
            </div>
            <div class="content">
              <slot name="content"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
defineProps(["isOpen"]);
const $emit = defineEmits(["updateIsOpen"]);
const updateIsOpen = (value) => {
  $emit("updateIsOpen", value);
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 0.2s ease-in-out;
  opacity: 0;

  &.active {
    opacity: 1;
    z-index: 10000000000;
  }
}
.root {
  position: relative;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  // background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  z-index: 100000000000;
  > div {
    min-width: 500px;
    @media (max-width: 600px) {
      min-width: auto;
      margin: 0px 20px;
    }
    color: #333;
    background-color: #fff;
    border-radius: 10px;
    .modal-header {
      padding: 16px 16px 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        padding: 8px;
        font-size: 20px;
      }
    }
    .content,
    .modal-footer {
      padding: 16px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, -50px);
}
</style>
