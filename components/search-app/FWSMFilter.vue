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

<script>
export default {
  name: "FWSMFilter"
};
</script>
