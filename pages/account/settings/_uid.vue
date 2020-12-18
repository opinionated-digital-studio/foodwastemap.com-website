<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Account settings</h1>
        <div class="columns">
          <div class="column is-half">
            <div v-if="success" class="notification is-primary">
              Your changes have been successfully saved
            </div>
            <div v-if="error" class="notification is-danger">{{ error }}</div>
          </div>
        </div>
        <div class="form-section">
          <form method="post" class="mb-4" @submit.prevent="changeDetails">
            <h2 class="title is-4">Address</h2>
            <div class="columns">
              <div class="column is-one-quarter">
                <div class="field">
                  <label class="label" for="street">Address</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      name="street"
                      id="street"
                      v-model="address.street"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-one-quarter">
                <div class="field">
                  <label class="label" for="postcode">Postcode</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      id="postcode"
                      name="postcode"
                      v-model="address.postcode"
                    />
                  </div>
                </div>
              </div>

              <div class="column is-one-quarter">
                <div class="field">
                  <label class="label" for="city">City</label>
                  <div class="control">
                    <input
                      class="input"
                      id="city"
                      type="text"
                      v-model="address.city"
                      name="city"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-one-quarter">
                <div class="field">
                  <label class="label">Country</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="address.country">
                        <option
                          v-for="country in countryList"
                          :key="country.alpha_2_code"
                          :value="country.alpha_2_code"
                          >{{ country.en_short_name }}</option
                        >
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" class="button is-primary mt-2">
              Save changes
            </button>
          </form>
        </div>

        <div class="form-section">
          <form method="post">
            <h2 class="title is-4">Subscription</h2>
            <p>You currently have a {{ subscriptionType }} plan.</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.form-section {
  margin-bottom: 3rem;
}
</style>

<script>
import { mapGetters } from "vuex";
import { countryList } from "kbrinl-lists";

export default {
  async asyncData(context) {
    return {
      countryList
    };
  },
  data() {
    return {
      address: {},
      success: null,
      error: null
    };
  },
  methods: {
    changeDetails: async function() {
      await this.$axios
        .$patch(`/api/orgs/${this.profile.id}`, {
          address: this.address
        })
        .then(res => {
          this.success = true;
          this.error = false;
        })
        .catch(e => {
          this.success = null;
          this.error = e.response.data.error;
        });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    profile: function() {
      if (this.loggedInUser) {
        if (this.loggedInUser.address) {
          this.address = this.loggedInUser.address;
        }
        return this.loggedInUser;
      }
    },
    subscriptionType: function() {
      if (this.loggedInUser) {
        return this.loggedInUser.isPaying ? "paid" : "free";
      }
    }
  }
};
</script>
