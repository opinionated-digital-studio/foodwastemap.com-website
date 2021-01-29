<template>
  <div id="sign-up">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="box">
              <h1 class="title">{{ $t('auth.signUp') }}</h1>
              <div v-if="error" class="notification is-danger">{{ error }}</div>
              <form method="post" @submit.prevent="signUp">
                <div class="field">
                  <label class="label">
                    {{ $t('user.name') }}
                    <input
                      class="input"
                      type="text"
                      name="full-name"
                      v-model="fullName"
                    />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    {{ $t('user.email') }}
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
                    {{ $t('user.companyName') }}
                    <input
                      class="input"
                      type="text"
                      name="company-name"
                      v-model="companyName"
                    />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    {{ $t('user.password') }}
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
                    {{ $t('user.verifyPassword') }}
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
                  {{ $t('auth.signUp') }}
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
export default {
  data() {
    return {
      fullName: "",
      companyName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      error: null,
    };
  },
  methods: {
    signUp: async function () {
      if (this.fullName === "") {
        this.error = "You must enter your full name";
      } else if (this.password.length < 8) {
        this.error = "Your password must be longer than 8 characters"
      } else if (this.password !== this.passwordConfirm) {
        this.error = "The passwords you have entered do not match";
      } else {
        try {
          await this.$axios.$post("/api/users", {
            fullName: this.fullName,
            companyName: this.companyName,
            email: this.email,
            password: this.password,
          });

          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });

          this.$router.push("/platform/profile/edit");
        } catch (e) {
          this.error = e.response.data.error;
        }
      }
    },
  },
};
</script>
