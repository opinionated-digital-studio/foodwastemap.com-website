<template>
  <dl class="fwsm-search-app-results">
    <FWSMResultItem v-for="(org, index) in found" :key="index" :org="org" :fwsmSectors="fwsmSectors"/>
  </dl>
</template>

<style lang="scss" scoped>
.fwsm-search-app-results {
  display: table;
  width: 100%;
  table-layout: fixed;
}
</style>

<script>
import FWSMResultItem from "@/components/search-app/FWSMResultItem.vue";
export default {
  name: "FWSMResults",
  components: { FWSMResultItem },
  props: {
    found: { type: Array, required: true },
    fwsmSectors: { type: Array, required: true },
  },
};
</script>
