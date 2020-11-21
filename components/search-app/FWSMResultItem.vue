<template>
  <div class="fwsm-search-app-results__item box">
    <div class="fwsm-search-app-results__base-info">
      <dt class="fwsm-search-app-results__key">Example company</dt>
      <dd class="fwsm-search-app-results__value">Example product</dd>
      <dd
        class="fwsm-search-app-results__value fwsm-search-app-results__country"
      >
        <small> <i class="fas fa-globe"></i> &nbsp; The Netherlands </small>
      </dd>
    </div>
    <div class="fwsm-search-app-results__action">
      <a
        href="/platform/profile/example-profile"
        class="button is-primary is-light is-medium mb-2"
        >More info</a
      >
      <dd class="fwsm-search-app-results__meta">
        <small> <i class="fas fa-calendar"></i> &nbsp; 10 December 2020</small>
      </dd>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fwsm-search-app-results {
  &__item {
    @include tablet() {
      display: flex !important;
      justify-content: space-between;
    }
  }

  &__key {
    font-weight: bold;
  }

  &__action {
    @include tablet() {
      text-align: right;
    }
  }

  &__key,
  &__value,
  &__meta {
    overflow-wrap: break-word;
  }

  &__country,
  &__meta {
    color: $grey-light;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FWSMResults"
});
</script>
