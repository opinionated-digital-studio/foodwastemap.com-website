<template>
  <dl class="fwsm-search-app-results">
    <FWSMResultItem />
    <FWSMResultItem />
    <FWSMResultItem />
  </dl>
</template>

<style lang="scss" scoped>
.fwsm-search-app-results {
  display: table;
  width: 100%;
  table-layout: fixed;
}
</style>

<script lang="ts">
import FWSMResultItem from "~/components/search-app/FWSMResultItem.vue";
import Vue from "vue";
export default Vue.extend({
  name: "FWSMResults",
  components: { FWSMResultItem }
});
</script>
