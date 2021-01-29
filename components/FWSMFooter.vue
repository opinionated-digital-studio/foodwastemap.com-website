<template>
  <footer class="fwsm-footer">
    <div class="fwsm-footer__body">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <a :href="localePath('/')"
              ><img class="fwsm-footer__logo" src="~/assets/images/logo.png"
            /></a>
          </div>
          <div class="column is-one-quarter">
            <h4 class="has-text-weight-bold is-size-6 fwsm-footer__heading">
              Food Waste Solution Map
            </h4>
            <ul class="fwsm-footer__nav is-size-6">
              <li class="fwsm-footer__nav-item">
                <a :href="localePath('/')" class="fwsm-footer__nav-link">{{
                  $t("pages.home")
                }}</a>
              </li>
              <li class="fwsm-footer__nav-item">
                <a
                  :href="localePath('/connections')"
                  class="fwsm-footer__nav-link"
                  >{{ $t("pages.connections") }}</a
                >
              </li>
              <li class="fwsm-footer__nav-item">
                <a
                  :href="localePath('/platform')"
                  class="fwsm-footer__nav-link"
                  >{{ $t("pages.platform") }}</a
                >
              </li>
              <li class="fwsm-footer__nav-item">
                <a
                  :href="localePath('/pricing')"
                  class="fwsm-footer__nav-link"
                  >{{ $t("pages.pricing") }}</a
                >
              </li>
              <li class="fwsm-footer__nav-item">
                <a :href="localePath('/about')" class="fwsm-footer__nav-link">{{
                  $t("pages.about")
                }}</a>
              </li>
            </ul>
          </div>
          <div class="column">
            <h4 class="has-text-weight-bold is-size-6 fwsm-footer__heading">
              Contact
            </h4>
            <ul class="fwsm-footer__nav is-size-6">
              <li class="fwsm-footer__nav-item">
                <a href="mailto:info@in-me.nl" class="fwsm-footer__nav-link"
                  >info@in-me.nl</a
                >
              </li>
              <li class="fwsm-footer__nav-item">Frank Donkers</li>
              <li class="fwsm-footer__nav-item">
                <a href="tel:0031614264811" class="fwsm-footer__nav-link"
                  >+31 (6) 14264811</a
                >
              </li>
              <li class="fwsm-footer__nav-item">Irina Birman</li>
              <li class="fwsm-footer__nav-item">
                <a href="tel:0031681025982" class="fwsm-footer__nav-link"
                  >+31 (6) 81025982</a
                >
              </li>
              <li class="fwsm-footer__nav-item">
                Innovation Media (In-Me) / The Hague, the Netherlands
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="fwsm-footer__end-ribbon">
      <div class="container">
        <p class="is-size-6">
          <strong>Food Waste Solution Map</strong> by
          <a href="https://in-me.nl">Innovation Media</a>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.fwsm-footer {
  border-top: 1px solid $grey-lighter;

  &__body {
    padding: 4rem 0;
  }

  &__heading {
    text-transform: uppercase;
    margin-bottom: 0.2rem;
  }

  &__logo {
    width: 10rem;
  }

  &__nav-item {
    padding: 0.2rem 0;
  }

  &__end-ribbon {
    background-color: $grey-lighter;
    padding: 1rem 0;
  }
}
</style>

<script>
export default {
  name: "FWSMFooter"
};
</script>
