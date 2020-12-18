<template>
  <div>
    <section class="section">
      <div class="container">
        <a class="fwsm-search-app__back-link" href="/platform"
          >&#8592; Back to results</a
        >
        <div class="columns">
          <div class="column is-two-thirds">
            <div class="fwsm-search-app__company-info">
              <div class="fwsm-search-app__company-image"></div>
              <div class="fwsm-search-app__company-details">
                <h1 class="title is-2 mb-2">{{ profile.orgName }}</h1>
                <div class="fwsm-search-app__company-location">
                  <i class="fas fa-map-marker-alt"></i> &nbsp;
                  {{ formatLocation }}
                </div>
                <div
                  class="fwsm-search-app__company-website"
                  v-if="profile.website"
                >
                  <a :href="profile.website" target="__blank">
                    {{ profile.website }}
                  </a>
                </div>
                <div class="fwsm-search-app__company-registered">
                  Last updated on {{ modifiedOn }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="authorizedToEdit" class="column">
            <a
              :href="'/platform/profile/edit/' + loggedInUser.id"
              class="button"
              >Edit profile</a
            >
            <a :href="'/account/settings/' + loggedInUser.id" class="button"
              >Account settings</a
            >
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

<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";

function capitalize(string) {
  return string.replace(/\b\w/g, c => c.toUpperCase());
}

export default {
  async asyncData(context) {
    const profile = await context.$axios
      .get(`orgs/${context.params.profile}`)
      .then(res => res.data);

    return {
      profile
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),

    formatLocation: function() {
      if (this.profile.address) {
        const city = this.profile.address.city || "";
        const country = this.profile.address.country || "";
        const result = capitalize(city) + ", " + capitalize(country);
        return result;
      }
    },
    modifiedOn: function() {
      if (this.profile.modifiedOn) {
        const modifiedOn = new Date(this.profile.modifiedOn);
        const formatDate = format(modifiedOn, "dd MMMM, yyyy");
        return formatDate;
      }
    },
    authorizedToEdit: function() {
      if (this.loggedInUser && this.profile) {
        return this.loggedInUser.id === this.profile.id;
      }
    }
  }
};
</script>
