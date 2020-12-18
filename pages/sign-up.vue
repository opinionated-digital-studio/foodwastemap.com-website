<template>
  <div id="sign-up">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="box">
              <h1 class="title">Sign up</h1>
              <p class="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <a href="">Read more</a>
              </p>
              <div v-if="error" class="notification is-danger">{{ error }}</div>
              <form method="post" @submit.prevent="signUp">
                <div class="field">
                  <label class="label">
                    First name
                    <input
                      class="input"
                      type="text"
                      name="fname"
                      v-model="firstName"
                    />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Last name
                    <input
                      class="input"
                      type="text"
                      name="lname"
                      v-model="lastName"
                    />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Email address
                    <input
                      class="input"
                      type="email"
                      name="email"
                      v-model="email"
                    />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Company name
                    <input
                      class="input"
                      type="text"
                      name="company-name"
                      v-model="orgName"
                    />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Password
                    <input
                      class="input"
                      type="password"
                      name="password"
                      v-model="password"
                    />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Confirm password
                    <input
                      class="input"
                      type="password"
                      name="password-confirm"
                      v-model="passwordConfirm"
                    />
                  </label>
                </div>

                <button
                  class="button is-primary is-medium mt-5 mb-4 is-fullwidth"
                  type="submit"
                >
                  Sign up
                </button>
                <small>
                  Signing up signifies that you agree to the Terms of Service
                  and our Privacy Policy.
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
#sign-up {
  background-color: $grey-lighter;
}
</style>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      orgName: "",
      password: "",
      passwordConfirm: "",
      error: null
    };
  },
  methods: {
    signUp: async function() {
      if (this.password !== this.passwordConfirm) {
        this.error = "The passwords you have entered do not match";
      } else {
        try {
          await this.$axios.$post("/api/orgs", {
            orgName: this.orgName,
            password: this.password,
            contactPerson: {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email
            }
          });

          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push("/");
        } catch (e) {
          this.error = e.response.data.error;
        }
      }
    }
  }
};
</script>
