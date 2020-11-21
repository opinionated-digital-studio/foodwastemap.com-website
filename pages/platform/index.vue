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
              <span class="fwsm-search-app__label--found">3 organizations</span>
              found
            </div>
            <div class="column">
              <FWSMMainSearch />
            </div>
          </div>

          <div class="columns">
            <div class="column is-one-third">
              <FWSMFilter />
            </div>
            <div class="column">
              <FWSMResults />
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
import Vue from "vue";
export default Vue.extend({
  components: { FWSMMainSearch, FWSMFilter, FWSMResults }
});
</script>
