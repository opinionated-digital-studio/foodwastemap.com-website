<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li class="is-active">
              <a href="/platform" aria-current="page">Platform</a>
            </li>
          </ul>
        </nav>

        <div class="fwsm-search-app">
          <div class="columns mb-5">
            <div class="column is-one-third">
              <h1 class="title is-2 mb-1">Find companies</h1>
              <span class="fwsm-search-app__label--found"
                >{{ numberOfOrgsFound }} organization(s)</span
              >
              found
            </div>
            <div class="column">
              <FWSMMainSearch
                :fwsmSectors="availableSectors"
                @doSearch="initiateSearch"
              />
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-third">
              <FWSMFilter v-if="availableSubsectors" :fwsmSubsectors="availableSubsectors" />
            </div>
            <div class="column">
              <FWSMResults
                v-if="!isLoading"
                :found="availableOrgs || initOrgs"
                :fwsmSectors="availableSectors"
              />
            <div class="has-text-centered" v-if="isLoading">
              <i class="fas fa-spinner"></i>
              <p>Loading...</p>
            </div>
            <div class="has-text-centered" v-if="numberOfOrgsFound === 0 && !isLoading">
              <i class="fas fa-times"></i>
              <p>No companies found with your chosen search query</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.fwsm-search-app {
  &__label {
    &--found {
      color: $primary;
    }
  }
}
</style>

<script>
import FWSMFilter from "~/components/search-app/FWSMFilter.vue";
import FWSMMainSearch from "~/components/search-app/FWSMMainSearch.vue";
import FWSMResults from "~/components/search-app/FWSMResults.vue";
import querystring from "querystring";

export default {
  components: { FWSMMainSearch, FWSMFilter, FWSMResults },

  async asyncData(context) {
    const query = context.query;
    const initOrgs = await context.$axios.$get(
      `${process.env.FWSM_API_URL}/orgs`,
      { params: query }
    );
    const allSectors = await context.$axios.$get(
      `${process.env.FWSM_API_URL}/fwsm-sectors`
    );

    return {
      initOrgs,
      allSectors,
    };
  },
  data() {
    return {
      availableOrgs: null,
      isLoading: false,
    };
  },
  computed: {
    availableSectors: function () {
      const availableOrgs = this.initOrgs;
      const allSectors = this.allSectors;
      const availableSectors = availableOrgs.map(function (org) {
        return org.sectorId;
      });
      const allAvailableSectors = availableSectors.flat();
      return allSectors.filter(function (sector) {
        return allAvailableSectors.some(function (availableSector) {
          return sector.id === availableSector;
        });
      });
    },
    availableSubsectors: function () {
      if (this.availableSectors) {
        const availableSectors = this.availableSectors
        const filterSubsectors = availableSectors.map(function(availableSector) {
          return availableSector.fwsmSubsectors
        })
        const availableOrgs = this.availableOrgs || this.initOrgs
        const availableSubsectors = availableOrgs.map(function(availableOrg) {
          return filterSubsectors.flat().find(function(subsector) {
            return (subsector.id === availableOrg.subsectorId)
          })
        })
        return availableSubsectors
      } else {
        return null
      }
    },
    numberOfOrgsFound: function () {
      if (this.availableOrgs) {
        return this.availableOrgs.length;
      } else {
        return this.initOrgs.length;
      }
    },
  },
  methods: {
    initiateSearch: async function (val) {
      const query = {
        orgName: val.searchQuery,
        country: val.selectedCountry,
        sectorId: val.selectedSector,
      };
      this.isLoading = true;
      const foundSectors = await this.$axios.$get("/api" + "/orgs", {
        params: query,
      });
      this.availableOrgs = foundSectors;
      this.isLoading = false;
    },
  },
};
</script>
