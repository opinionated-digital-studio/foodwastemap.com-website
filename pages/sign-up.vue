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

              <form action="" method="post">
                <div class="field">
                  <label class="label">
                    First name
                    <input class="input" type="text" name="fname" />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Last name
                    <input class="input" type="text" name="lname" />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Email address
                    <input class="input" type="email" name="email" />
                  </label>
                </div>

                <div class="field">
                  <label class="label">
                    Company name
                    <input class="input" type="text" name="company-name" />
                  </label>
                </div>

                <div class="field">
                  <label class="label" for="country">Country</label>
                  <div class="control is-expanded">
                    <div class="select is-fullwidth">
                      <select id="country" name="country">
                        <option value="Argentina">Argentina</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Chile">Chile</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Venezuela">Venezuela</option>
                      </select>
                    </div>
                  </div>
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

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
