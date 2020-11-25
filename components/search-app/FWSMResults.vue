<template>
  <dl class="fwsm-search-app-results">
    <FWSMResultItem v-for="(org, index) in found" :key="index" :org="org" :fwsmSectors="fwsmSectors" />
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
import Vue, { PropOptions } from "vue";
import FWSMResultItem from "@/components/search-app/FWSMResultItem.vue";
import { Org } from "@/types";
import FwsmSector from "@/types/fwsm-sector";

type FwsmSectors = Array<FwsmSector>

type Orgs = Array<Org>;

export default Vue.extend({
  name: "FWSMResults",
  components: { FWSMResultItem },
  props: {
    found: { type: Array, required: false, default: () => [] } as PropOptions<
      Orgs
    >,
    fwsmSectors: {type: Array, required: true} as PropOptions<FwsmSectors>
  },
});
</script>
