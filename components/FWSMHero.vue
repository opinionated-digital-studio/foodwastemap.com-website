<template>
  <div>
    <section class="hero is-medium is-bold">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">Food Waste Solution Map</h1>
          <h2 class="subtitle">Mapping Value in Food Chain Business</h2>

          <form method="GET" class="hero-search-form" action="/platform">
            <div class="hero-search">
              <div class="field has-addons">
                <div class="control is-expanded has-icons-left">
                  <input
                    class="hero-search__input input is-full-width is-medium"
                    type="text"
                    name="company-name"
                    placeholder="Bedrijfsnaam zoeken"
                  />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
                <div class="control">
                  <a
                    class="hero-search__search-button button is-light is-medium"
                  >
                    Zoek
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background-size: cover;
  background-position: center;
  background-image: url('~@/assets/images/bovenbalk.jpg');
}
.hero-search-form {
  @include desktop() {
    width: 65%;
    margin: 0 auto;
  }
}
.hero-search {
  width: 100%;
  border: 1px solid $border;
  border-radius: $radius-large;
  bottom: 0;
  background-color: $scheme-main;
  color: $body-color;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  .field {
    margin-bottom: 0;
  }

  &__input {
    border-radius: $radius-large;
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
  color: $white;
  @include desktop() {
    font-size: 4rem;
  }
}

.subtitle {
  color: $white;
  @include desktop() {
    margin-top: 1rem !important;
  }
}

.cta {
  color: $white;
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

<script>
export default {
  name: "FWSMHero",
};
</script>
