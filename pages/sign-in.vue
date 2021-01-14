<template>
  <div id="sign-up">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="box">
              <h1 class="title">Sign in</h1>
              <p class="mb-5">Welcome back to FWSM</p>

              <div v-if="error" class="notification is-danger">{{ error }}</div>
              <form @submit.prevent="signIn" method="post">
                <div class="field">
                  <label class="label">
                    Email address
                    <input
                      class="input"
                      type="email"
                      name="email"
                      v-model="email"
                      autocomplete="email"
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

                <button
                  class="button is-primary is-medium mt-5 mb-4 is-fullwidth"
                  type="submit"
                >
                  Sign in
                </button>
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
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async signIn() {
      if (this.email === "" || undefined || !validateEmail(this.email)) {
        this.error = "Fill in a valid email address";
      } else if (this.password.length < 8) {
        this.error = "The password you have entered is incorrect"
      } else {
        try {
          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });

          // this.$router.push("/")
        } catch (e) {
          this.error = e.response.data.message;
        }
      }
    },
  },
};
</script>
