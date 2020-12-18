<template>
  <div class="fwsm-search-app-results__item box">
    <div class="fwsm-search-app-results__base-info">
      <dt class="fwsm-search-app-results__key">{{ org.orgName }}</dt>
      <dd class="fwsm-search-app-results__value" v-html="org.fwsmSector && org.fwsmSector.name">
      </dd>
      <dd
        class="fwsm-search-app-results__value fwsm-search-app-results__country"
      >
        <small>
          <i class="fas fa-globe"></i> &nbsp; {{ formatOrgLocation }}
        </small>
      </dd>
    </div>
    <div class="fwsm-search-app-results__action">
      <a
        :href="'/platform/profile/' + org.id"
        class="button is-primary is-light is-medium mb-2"
        >More info</a
      >
      <dd class="fwsm-search-app-results__meta">
        <small>
          <i class="fas fa-calendar"></i> &nbsp;
          {{ formatLastModified }}
        </small>
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

<script>
import { format } from "date-fns";

export default {
  name: "FWSMResultItem",
  props: {
    org: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatLastModified: function() {
      return format(this.org.modifiedOn, "d MMMM yyyy");
    },
    formatOrgLocation: function() {
      if (this.org.address) {
        return this.org.address.city + ", " + this.org.address.country;
      }
    }
  }
};
</script>
