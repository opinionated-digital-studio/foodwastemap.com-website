<template>
  <div class="fwsm-search-app-results__item box">
    <div class="fwsm-search-app-results__base-info">
      <dt class="fwsm-search-app-results__key">{{ org.orgName }}</dt>
      <dd class="fwsm-search-app-results__value">
        {{ formatSubsector.sectorName }}: {{ formatSubsector.subsectorName }}
      </dd>
      <dd
        class="fwsm-search-app-results__value fwsm-search-app-results__country"
      >
        <small> <i class="fas fa-globe"></i> &nbsp; {{ formatCountry }} </small>
      </dd>
    </div>
    <div class="fwsm-search-app-results__action">
      <a
        href="/platform/profile/example-profile"
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

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { format } from "date-fns";

import { Org } from "~/types";
import FwsmSector from "@/types/fwsm-sector";

type FwsmSectors = Array<FwsmSector>;

export default Vue.extend({
  name: "FWSMResultItem",
  props: {
    org: {
      type: Object,
      required: true,
    } as PropOptions<Org>,
    fwsmSectors: {
      type: Array,
      required: true,
    } as PropOptions<FwsmSectors>,
  },

  computed: {
    formatCountry(): string {
      const capitalStr = this.org.address.country.replace(/\b\w/g, function (
        c
      ) {
        return c.toUpperCase();
      });
      return capitalStr;
    },
    formatModfiedOn(): string {
      const timestamp = this.org.modifiedOn;
      const date = new Date(timestamp);
      const formattedDate = format(date, "dd LLL yyyy");
      return formattedDate;
    },
    formatSubsector(): object {
      const sectorId = this.org.sectorId;
      const subsectorId = this.org.subsectorId;
      const fwsmSectors = this.fwsmSectors;
      const foundSector = fwsmSectors.find(function (fwsmSector: FwsmSector) {
        return fwsmSector.id === sectorId;
      });
      if (
        foundSector !== undefined &&
        foundSector.fwsmSubsectors !== undefined
      ) {
        const foundSubsector = foundSector.fwsmSubsectors.find(function (
          fwsmSubsector
        ) {
          return fwsmSubsector.id === subsectorId;
        });
        return {
          sectorName: foundSector.name,
          subsectorName: foundSubsector.name,
        };
      } else {
        return {}
      }
    },
  },
});
</script>
