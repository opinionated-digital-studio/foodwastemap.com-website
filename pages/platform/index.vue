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
            </div>
            <div class="column">
              <FWSMMainSearch
                :fwsmSectors="fwsmSectors"
                @search-query-changed="getSearchQueryData"
                @fwsm-sector-changed="getFwsmSectorQueryData"
                @doSearch="doSearch"
              />
            </div>
          </div>
          <div class="columns">
            <div class="column is-one-third"></div>

            <div class="column">
              <FWSMResults :orgs="mergedOrgs" />
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

export default {
  components: {
    FWSMFilter,
    FWSMMainSearch,
    FWSMResults
  },
  async asyncData(context) {
    const fwsmSectors = await context.$axios
      .$get("/fwsm-sectors")
      .then(res => res)

      .catch(err => {
        console.log(err);
        return err;
      });

    const orgs = await context.$axios
      .get("/orgs")
      .then(res => res.data)

      .catch(err => {
        console.log(err);
        return err;
      });

    return { fwsmSectors, orgs };
  },
  data() {
    return {
      isLoading: false,
      searchOptions: {
        searchQuery: "",
        fwsmSector: ""
      }
    };
  },
  computed: {
    mergedOrgs: function() {
      if (this.orgs && this.fwsmSectors) {
        const mergedOrgs = this.orgs.map(org => {
          const relatedSector = this.fwsmSectors;
          const relatedFwsmSector = this.fwsmSectors.find(
            fwsmSector => fwsmSector.id === org.fwsmSectorId
          );
          return { ...org, fwsmSector: relatedFwsmSector };
        });
        return mergedOrgs;
      }
    },
    numberOfOrgsFound: function() {
      return this.orgs.length;
    }
  },
  methods: {
    doSearch: async function(e) {
      this.isLoading = true;
      const searchQuery =
        this.searchOptions.searchQuery.length > 1
          ? `&orgName=${this.searchOptions.searchQuery}`
          : "";
      const fwsmSectorQuery =
        this.searchOptions.fwsmSector.length > 1
          ? `&fwsmSectorId=${this.searchOptions.fwsmSector}`
          : "";
      const foundOrgs = await this.$axios.$get(
        `/api/orgs/?${searchQuery}${fwsmSectorQuery}`
      );
      this.isLoading = false;
      this.orgs = foundOrgs;
    },
    getSearchQueryData: function(e) {
      console.log(e);
      this.searchOptions.searchQuery = e;
    },
    getCountryQueryData: function(e) {
      this.searchOptions.country = e;
    },
    getFwsmSectorQueryData: function(e) {
      this.searchOptions.fwsmSector = e;
    }
  }
};

function removeEmptyArrayItems(array) {
  return array.filter(item => item);
}

function removeDuplicates(array) {
  const uniqueSet = new Set(array);
  return [...uniqueSet];
}
</script>
