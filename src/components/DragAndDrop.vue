<template>
  <div class="drop-area" @drop="handleDrop" @dragover.prevent>
    <div class="upload-box">
      <label for="fileInput" class="upload-icon">
        <i class="bi bi-upload"></i>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleFileInput"
      />
      <h5 class="fw-bold">{{ dropMessage }}</h5>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
// store
import { product } from "../stores/counter";
import { storeToRefs } from "pinia";
const getData = product();
const { productImage, imageName } = storeToRefs(getData);
// toast imports
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// Maximum file size in megabytes
const MAX_FILE_SIZE_MB = 2;

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];

  if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
    success();
    productImage.value = file;
    imageName.value = file.name;
  } else {
    productImage.value = null;
    imageName.value = "";
    faild(
      `Image size exceeds the maximum allowed (${MAX_FILE_SIZE_MB}MB). Please select a smaller image.`
    );
  }
};

const handleFileInput = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
    success();
    productImage.value = file;
    imageName.value = file.name;
  } else {
    productImage.value = null;
    imageName.value = "";
    faild(
      `Image size exceeds the maximum allowed (${MAX_FILE_SIZE_MB}MB). Please select a smaller image.`
    );
  }
};

// drop message
const dropMessage = computed(() => {
  return imageName.value
    ? `Dropped image: ${imageName.value}`
    : "Drag & drop an image here";
});

// Toast Management
const $toast = useToast();
let faild = (message) => {
  $toast.error(message, {
    position: "bottom-right",
  });
};
let success = () => {
  $toast.success("Image uploded successfully", {
    position: "bottom-right",
  });
};
</script>

<style lang="scss" scoped>
.drop-area {
  width: 100%;
  height: 300px;
  border: 2px dashed rgb(102 255 204 / 46%);
  border-radius: 6px;
  text-align: center;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0px 2px 6px rgba(4, 119, 81, 0.3);
  }
  .upload-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .upload-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      margin-bottom: 5px;
      background-color: rgb(102 255 204 / 46%);
      border-radius: 6px;
      i {
        color: #19ad7b;
        font-size: 20px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
