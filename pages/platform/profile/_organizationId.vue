<template>
  <div>
    <section class="section">
      <div class="container">
        <a class="fwsm-search-app__back-link" :href="localePath('/platform')"
          >&#8592; {{ $t("profile.backToResults") }}</a
        >
        <div class="columns">
          <div class="column is-two-thirds">
            <div class="fwsm-search-app__company-info">
              <div class="fwsm-search-app__company-image"></div>
              <div class="fwsm-search-app__company-details">
                <h1 class="title is-2 mb-2">{{ organization.companyName }}</h1>
                <div
                  v-if="organization.address.country"
                  class="fwsm-search-app__company-location"
                >
                  <i class="fas fa-map-marker-alt"></i> &nbsp;
                  {{ formatLocation }}
                </div>
                <div
                  class="fwsm-search-app__company-website"
                  v-if="organization.website"
                >
                  <a :href="formatWebsite" target="__blank">
                    {{ formatWebsite }}
                  </a>
                </div>
                <div class="fwsm-search-app__company-registered mb-5">
                  {{ $t("profile.lastUpdatedOn") }} {{ modifiedOn }}
                </div>
              </div>
            </div>
          </div>
          <div class="column has-text-right">
            <a
              v-if="organization.email"
              :href="'mailto:' + organization.email"
              class="button is-primary"
              >{{ $t("profile.sendEmail") }}</a
            >
            <a
              v-if="authorizedToEdit"
              :href="'/platform/profile/edit'"
              class="button"
              >{{ $t("profile.editProfile") }}</a
            >
          </div>
        </div>
        <div class="columns">
          <div class="column is-two-thirds mb-3">
            <hr />
            <div class="mb-5" v-html="organization.text"></div>
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
import { enUS, nl } from "date-fns/locale";
const locales = { en: enUS, nl };

function capitalize(string) {
  return string.replace(/\b\w/g, c => c.toUpperCase());
}

export default {
  async asyncData(context) {
    const profile = await context.$axios
      .get(`/api/organizations/oid/${context.params.organizationId}`)
      .then(res => res.data);
    return {
      ...profile
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),

    formatWebsite: function() {
      if (this.organization.website) {
        if (!this.organization.website.match(/^[a-zA-Z]+:\/\//)) {
          return "http://" + this.organization.website;
        }
      }
    },
    formatLocation: function() {
      if (this.organization.address) {
        const city = this.organization.address.city || "";
        const country = this.organization.address.country || "";
        const result = capitalize(city) + ", " + capitalize(country);
        return result;
      }
    },
    modifiedOn: function() {
      if (this.organization.modifiedOn) {
        const modifiedOn = new Date(this.organization.modifiedOn);
        const formatDate = format(modifiedOn, "dd MMMM, yyyy", {
          locale: locales[this.$i18n.locale]
        });
        return formatDate;
      }
    },
    authorizedToEdit: function() {
      if (this.loggedInUser && this.organization) {
        return this.loggedInUser.userId === this.organization.userId;
      }
    }
  }
};
</script>
