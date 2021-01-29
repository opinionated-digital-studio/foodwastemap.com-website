<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/">{{ $t('pages.home') }}</a></li>
            <li class="is-active">
              <a href="/platform" aria-current="page">{{ $t('pages.platform') }}</a>
            </li>
          </ul>
        </nav>

        <div class="fwsm-search-app">
          <div class="columns mb-5">
            <div class="column is-one-third">
              <h1 class="title is-2 mb-1">{{ $t('searchApp.title') }}</h1>
              <span class="fwsm-search-app__label--found"
                >{{ numberOfOrgsFound }} {{ $t('searchApp.numberOfCompaniesFound') }}</span
              >
            </div>
            <div class="column">
              <FWSMMainSearch
                :fwsmSectors="availableSectors"
                @search-query-changed="getSearchQueryData"
                @fwsm-sector-changed="getFwsmSectorQueryData"
                @doSearch="doSearch"
              />
            </div>
          </div>
          <div class="columns">
            <div class="column is-one-third"></div>

            <div class="column">
              <FWSMResults :organizations="searchResults" />
              <div class="has-text-centered" v-if="isLoading">
                <i class="fas fa-spinner"></i>
                <p>Loading...</p>
              </div>
              <div
                class="has-text-centered"
                v-if="numberOfOrgsFound === 0 && !isLoading"
              >
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

function searchByName(query, organization) {
  const rg = new RegExp(query, 'i')
  return rg.test(organization.companyName)
}

export default {
  components: {
    FWSMFilter,
    FWSMMainSearch,
    FWSMResults,
  },
  async asyncData(context) {
    const { organizations } = await context.$axios.$get("/api/organizations/");
    const { sectors } = await context.$axios.$get("/api/sectors/all");

    let fromHomePageQuery = []
    if (context.query['company-name']) {
      fromHomePageQuery = organizations.filter(organization => {
        return searchByName(context.query['company-name'], organization)
      })
    }

    return {
      organizations,
      sectors,
      fromHomePageQuery
    };
  },
  computed: {
    availableSectors: function () {
      const organizationsWithSpecifiedSectors = this.organizations.filter(
        (organization) => organization.subsectorId
      );
      const availableSectors = this.sectors.filter((sector) =>
        organizationsWithSpecifiedSectors.some(
          (organization) => organization.subsectorId === sector.subsectorId
        )
      );
      return availableSectors;
    },
    numberOfOrgsFound: function() {
      return this.searchResults.length
    }
  },
  data() {
    return {
      searchResults: [],
      isLoading: false,
      searchOptions: {
        companyNameQuery: "",
        sectorQuery: "",
      },
    };
  },
  mounted() {
    if (this.fromHomePageQuery.length < 1) {
      this.searchResults = this.organizations;
    } else {
      this.searchResults = this.fromHomePageQuery
    }
  },
  methods: {
    doSearch: async function (e) {
      this.isLoading = true;
      const filterBySector = this.searchOptions.sectorQuery
        ? this.organizations.filter(
            (organization) =>
              organization.subsectorId === this.searchOptions.sectorQuery
          )
        : this.organizations;

      const filterByCompanyName = this.searchOptions.companyNameQuery
        ? filterBySector.filter(organization => {
          return searchByName(this.searchOptions.companyNameQuery, organization)
        })
        : filterBySector
      this.searchResults = filterByCompanyName
      this.isLoading = false;
    },
    getSearchQueryData: function (e) {
      this.searchOptions.companyNameQuery = e;
    },
    getFwsmSectorQueryData: function (e) {
      this.searchOptions.sectorQuery = e;
    },
  },
};

</script>
