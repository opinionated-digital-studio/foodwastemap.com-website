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

<script>
import FWSMHeader from "~/components/FWSMHeader.vue";
import FWSMFooter from "~/components/FWSMFooter.vue";
export default {
  components: { FWSMHeader, FWSMFooter }
};
</script>
