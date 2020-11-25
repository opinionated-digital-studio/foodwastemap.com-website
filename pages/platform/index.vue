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
                >{{ numberOfOrgsFound }} organizations</span
              >
              found
            </div>
            <div class="column">
              <FWSMMainSearch :fwsmSectors="fwsmSectors" />
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-third">
              <FWSMFilter :fwsmSubsectors="availableSubsectors" />
            </div>
            <div class="column">
              <FWSMResults :found="foundOrgs" :fwsmSectors="fwsmSectors" />
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

<script lang="ts">
import FWSMFilter from "~/components/search-app/FWSMFilter.vue";
import FWSMMainSearch from "~/components/search-app/FWSMMainSearch.vue";
import FWSMResults from "~/components/search-app/FWSMResults.vue";
import querystring from "querystring";
import Vue from "vue";

import FwsmSector from "@/types/fwsm-sector";
import Org from "@/types/org";

type FwsmSectors = Array<FwsmSector>;
type Orgs = Array<Org>;

export default Vue.extend({
  components: { FWSMMainSearch, FWSMFilter, FWSMResults },
  async asyncData(context) {
    const query = querystring.stringify(context.query);
    const fwsmSectors: FwsmSectors = await context.$axios.$get(
      `${process.env.FWSM_API_URL}/fwsm-sectors`
    );
    const fwsmSubsectors = fwsmSectors.map((fwsmSector) => {
      return fwsmSector.fwsmSubsectors;
    });
    const joinedFwsmSubsectors = fwsmSubsectors.flat();
    const foundOrgs: Orgs = await context.$axios.$get(
      `${process.env.FWSM_API_URL}/orgs?${query}`
    );

    let availableSubsectors = [];
    if (foundOrgs.length > 0) {
      const findAvailableSubsectors = foundOrgs.map(function (foundOrg) {
        {
          return fwsmSectors.map(function (fwsmSector) {
            return fwsmSector.fwsmSubsectors.find(function (fwsmSubsector) {
              return fwsmSubsector.id === foundOrg.subsectorId;
            });
          });
        }
      });
      availableSubsectors = findAvailableSubsectors.flat().filter(function (
        element
      ) {
        return element !== undefined;
      });
      console.log(availableSubsectors)
    }

    return {
      foundOrgs,
      fwsmSectors,
      joinedFwsmSubsectors,
      availableSubsectors,
    };
  },
  computed: {
    numberOfOrgsFound(): number {
      return this.foundOrgs.length;
    },
  },
});
</script>
