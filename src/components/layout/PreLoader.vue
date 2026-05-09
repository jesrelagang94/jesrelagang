<template>
  <div id="preloader">
    <div class="loader_line"></div>
  </div>
</template>

<script>
import { preloader } from "@/utils/dom-effects";

export default {
  name: "PreLoader",
  mounted() {
    preloader();
  },
};
</script>
