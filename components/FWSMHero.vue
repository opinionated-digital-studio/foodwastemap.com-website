<template>
  <div>
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">Food Waste Solution Map</h1>
          <h2 class="subtitle">
            Lets make food waste &amp; food loss history. Mapping opportunities
            in the Food Chain Business
          </h2>
          <a class="button is-white" href="">Sign up for free</a>
        </div>
      </div>
      <div class="hero-search">
        <div class="field has-addons">
          <div class="control is-expanded has-icons-left">
            <input
              class="hero-search__input input is-full-width is-medium"
              type="text"
              placeholder="Search company by name or sector"
            />
            <span class="icon is-medium is-left">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <div class="control">
            <a class="hero-search__search-button button is-light is-medium">
              Search
            </a>
          </div>
        </div>
        <div class="hero-search__tags">
          <div>Sectors:</div>
          <a href="" class="button is-small is-light">Production</a>
          <a href="" class="button is-small is-light">Harvesting</a>
          <a href="" class="button is-small is-light">Processing</a>
          <a href="" class="button is-small is-light"
            >Packaging, storage &amp; ripening</a
          >
          <a href="" class="button is-small is-light"
            >Transportation &amp; distribution</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero-search {
  width: 95%;
  border: 1px solid $border;
  border-radius: $radius-large;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  position: absolute;
  background-color: $scheme-main;
  color: $body-color;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @include desktop() {
    max-width: 45rem;
  }

  .field {
    margin-bottom: 0;
  }

  &__input {
    border-radius: $radius-large $radius-large 0 0;
    border: 0;
    border-bottom: solid 1px $border;
    margin: 0;
  }

  &__search-button {
    border-radius: $radius-large $radius-large 0 0;
    border-bottom: 1px solid $border !important;
  }

  &__tags {
    padding: 0.5rem;
  }
}

.main-search-panel {
  max-width: 40rem;
}
.hero {
  position: relative;
  margin-bottom: 6rem;
}

.title {
  @include desktop() {
    font-size: 4rem;
  }
}

.subtitle {
  @include desktop() {
    margin-top: 1rem !important;
  }
}

.cta {
  color: $body-background-color;
  text-decoration: underline;
}

.hero-body {
  @include desktop() {
    margin-left: auto;
    margin-right: auto;
    max-width: 55rem;
  }
}

.button:not(.hero-search__search-button) {
  margin-top: 0.3rem;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FWSMHero",
});
</script>
