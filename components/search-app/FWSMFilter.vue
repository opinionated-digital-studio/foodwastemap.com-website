<template>
  <div class="fwsm-pane block">
    <h3 class="title is-5 mb-2">Filter by subsector</h3>
    <div
      v-for="fwsmSubsector in sortedSubsectors"
      :key="fwsmSubsector.id"
      class="fwsm-search-app-filter__checkbox"
    >
      <input :id="'filter-' + fwsmSubsector.id" type="checkbox" />
      <label
        class="checkbox"
        :for="'filter-' + fwsmSubsector.id"
        v-html="fwsmSubsector.name"
      >
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import FwsmSubsector from '@/types/fwsm-subsector'

type FwsmSubsectors = Array<FwsmSubsector>;

export default Vue.extend({
  name: "FWSMFilter",
  props: {
    fwsmSubsectors: { type: Array, required: true } as PropOptions<
      FwsmSubsectors
    >,
  },
  computed: {
    sortedSubsectors: function () {
      const fwsmSubsectors: FwsmSubsectors = this.fwsmSubsectors;
      const sortedSubsectors = fwsmSubsectors.sort(function (
        a: FwsmSubsector,
        b: FwsmSubsector
      ) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      return sortedSubsectors;
    },
  },
});
</script>
