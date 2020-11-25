<template>
  <div class="layout-wrapper">
    <FWSMHeader />
    <nuxt />
    <FWSMFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.fwsm-footer {
  margin-top: auto;
}
</style>

<script lang="ts">
import FWSMHeader from "~/components/FWSMHeader.vue";
import FWSMFooter from "~/components/FWSMFooter.vue";
import Vue from "vue";
export default Vue.extend({
  components: { FWSMHeader, FWSMFooter },
});
</script>
