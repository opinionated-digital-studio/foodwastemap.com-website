<template>
  <div class="fwsm-search-app-results__item box">
    <div class="fwsm-search-app-results__base-info">
      <dt class="fwsm-search-app-results__key">
        {{ organization.companyName }}
      </dt>
      <dd
        class="fwsm-search-app-results__value"
        v-html="organization.subsectorId && formatSectorName"
      ></dd>
      <dd
        class="fwsm-search-app-results__value fwsm-search-app-results__country"
      >
        <small>
          <i v-if="organization.address.country" class="fas fa-globe"></i>
          &nbsp; {{ formatOrgLocation }}
        </small>
      </dd>
    </div>
    <div class="fwsm-search-app-results__action">
      <nuxt-link
        :to="localePath('/platform/profile/' + organization.organizationId)"
        class="button is-primary is-light is-medium mb-2"
        >{{ $t("searchApp.moreInfo") }}</nuxt-link
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
import { enUS, nl } from "date-fns/locale";
const locales = { en: enUS, nl }

export default {
  name: "FWSMResultItem",
  props: {
    organization: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sectors: [],
    };
  },
  async fetch() {
    const { sectors } = await this.$axios
      .$get("/api/sectors/all")
      .then((res) => res);
    this.sectors = sectors;
  },
  computed: {
    formatLastModified: function () {
      return format(this.organization.modifiedOn, "d MMMM yyyy", {
        locale: locales[this.$i18n.locale],
      });
    },
    formatOrgLocation: function () {
      if (this.organization.address) {
        return (
          this.organization.address.city +
          ", " +
          this.organization.address.country
        );
      }
    },
    formatSectorName: function () {
      if (this.organization.subsectorId && this.sectors.length >= 1) {
        const match = this.sectors.find(
          (sector) => sector.subsectorId === this.organization.subsectorId
        );
        return match.subsector;
      }
    },
  },
};
</script>
