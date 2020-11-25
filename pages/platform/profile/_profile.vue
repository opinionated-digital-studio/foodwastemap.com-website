<template>
  <div>
    <section class="section">
      <div class="container">
        <a class="fwsm-search-app__back-link" href="/platform"
          >&#8592; Back to results</a
        >
        <div class="fwsm-search-app__company-info">
          <div class="fwsm-search-app__company-image"></div>
          <div class="fwsm-search-app__company-details">
            <h1 class="title is-2">{{ profile.orgName }}</h1>
            <div class="fwsm-search-app__company-location">
              <i class="fas fa-map-marker-alt"></i> &nbsp;
              {{ profile.address.city }}, {{ profile.address.country }}
            </div>
            <div class="fwsm-search-app__company-website">
              <a :href="profile.website">{{ profile.website }}</a>
            </div>
            <div class="fwsm-search-app__company-registered">
              Last updated on {{ formatModfiedOn }}
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-two-thirds">
            <hr />
            <div class="company-description" v-html="profile.bio"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.fwsm-search-app {
  &__back-link {
    display: inline-block;
    margin-bottom: 1.5rem;
  }
  &__company-info {
    margin-bottom: 1rem;
    display: flex;
  }
  &__company-registered {
    color: $grey-light;
  }
  &__company-image {
    margin-right: 2rem;
    background-color: $grey-lighter;
    height: 160px;
    width: 160px;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import { format } from "date-fns";
import Org from "@/types/org";

export default Vue.extend({
  async asyncData(context) {
    const profile: Org = await context.$axios.$get(
      `${process.env.FWSM_API_URL}/orgs/${context.params.profile}`
    );
    return { profile };
  },
  computed: {
    formatModfiedOn: function(): string {
      const profile: Org = (this as any).profile;
      const timestamp = profile.modifiedOn;
      const date = new Date(timestamp);
      const formattedDate = format(date, "dd LLL yyyy");
      return formattedDate;
    },
  },
});
</script>
