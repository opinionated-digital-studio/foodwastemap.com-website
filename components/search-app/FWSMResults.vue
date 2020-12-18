<template>
  <dl class="fwsm-search-app-results">
    <FWSMResultItem v-for="(org, index) in orgs" :key="index" :org="org" />
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
    orgs: { type: Array, required: true }
  }
};
</script>
