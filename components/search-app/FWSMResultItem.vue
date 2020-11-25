<template>
  <div class="fwsm-search-app-results__item box">
    <div class="fwsm-search-app-results__base-info">
      <dt class="fwsm-search-app-results__key">{{ org.orgName }}</dt>
      <dd class="fwsm-search-app-results__value">
        {{ formatSector.sectorName }}: {{ formatSector.subsectorName }}
      </dd>
      <dd
        class="fwsm-search-app-results__value fwsm-search-app-results__country"
      >
        <small>
          <i class="fas fa-globe"></i> &nbsp; {{ org.address.city }},
          {{ org.address.country }}
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
          <i class="fas fa-calendar"></i> &nbsp; {{ formatModfiedOn }}</small
        >
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
      required: true,
    },
    fwsmSectors: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formatModfiedOn: function () {
      const timestamp = this.org.modifiedOn;
      const date = new Date(timestamp);
      const formattedDate = format(date, "dd LLL yyyy");
      return formattedDate;
    },
    formatSector: function () {
      const sectorId = this.org.sectorId;
      const subsectorId = this.org.subsectorId;
      const fwsmSectors = this.fwsmSectors;
      const foundSector = fwsmSectors.find(function (fwsmSector) {
        return fwsmSector.id === sectorId;
      });
      const foundSubsector = foundSector.fwsmSubsectors.find(function (
        fwsmSubsector
      ) {
        return fwsmSubsector.id === subsectorId;
      });
      return {
        sectorName: foundSector.name,
        subsectorName: foundSubsector.name,
      };
    },
  },
};
</script>
