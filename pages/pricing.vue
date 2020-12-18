<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li class="is-active">
              <a href="/pricing" aria-current="page">Prijzen</a>
            </li>
          </ul>
        </nav>

        <h1 class="title is-1">Pricing</h1>
        <div class="columns">
          <div class="column is-two-thirds">
            <p class="subtitle pb-5 mb-5">
              Met de ‘Food Waste Solutions Map' willen wij bedrijven,
              instanties, universiteiten/opleidingen, retail en consumenten
              uitnodigen om te indiceren in welk stadium (onder welke sector)
              van de map hun drijfveer/prioriteit/product of belang ligt!
            </p>
          </div>
        </div>

        <div class="columns fwsm-pricing-table">
          <div class="column is-one-quarter fwsm-pricing-table__column">
            <div class="box fwsm-pricing-table__card">
              <h3
                class="title is-4 has-text-centered fwsm-pricing-table__title"
              >
                Standaard
              </h3>
              <div class="fwsm-pricing-table__price">
                <div
                  class="fwsm-pricing-table__main-price has-text-centered is-size-3"
                >
                  Gratis
                </div>
              </div>
              <ul class="fwsm-pricing-table__perks is-size-6">
                <li class="fwsm-pricing-table__perk-item">
                  Beperkte vermelding op bedrijvenpagina bij de betreffende
                  sector en het segment van keus
                </li>
                <li class="fwsm-pricing-table__perk-item">
                  Ontvang 2x per jaar het digitale magazine van In-Me
                </li>
              </ul>

              <a
                href=""
                class="button is-primary is-fullwidth fwsm-pricing-table__cta"
                >Registreer nu</a
              >
            </div>
          </div>

          <div class="column is-one-quarter fwsm-pricing-table__column">
            <div class="box fwsm-pricing-table__card">
              <h3
                class="title is-4 has-text-centered fwsm-pricing-table__title"
              >
                Plus
              </h3>
              <div class="fwsm-pricing-table__price">
                <div
                  class="fwsm-pricing-table__main-price has-text-centered is-size-3"
                >
                  &euro; 250/jaar
                </div>
                <div class="fwsm-pricing-table__sub-price has-text-centered">
                  <small>&euro; 0,68/dag</small>
                </div>
              </div>
              <ul class="fwsm-pricing-table__perks is-size-6">
                <li class="fwsm-pricing-table__perk-item">
                  Uitgebreide vermelding op bedrijvenpagina bij de betreffende
                  sector en het segment van keus
                </li>
                <li class="fwsm-pricing-table__perk-item">
                  Één maal per jaar een spotlight op de spotlight pagina
                </li>
                <li class="fwsm-pricing-table__perk-item">
                  Voordelige consulting voorwaarden via In-Me met partner
                  Stroomi b.v.
                </li>
                <li class="fwsm-pricing-table__perk-item">
                  Mogelijkheid voor artikel in In-Me magazine
                </li>
                <li class="fwsm-pricing-table__perk-item">
                  Poster FWSM op A1 formaat
                </li>
                <li class="fwsm-pricing-table__perk-item">
                  Ontvangt 2x per jaar het digitale magazine van In-Me
                </li>
              </ul>

              <a
                href=""
                class="button is-primary is-fullwidth fwsm-pricing-table__cta"
                >Registreer nu</a
              >
            </div>
          </div>
        </div>

        <h2 class="title">Alle voordelen op een rij</h2>
        <div class="content">
          <ul>
            <li>
              Zoek naar exposure, netwerken of nieuwe oplossingen en kansen voor
              uw bedrijf.
            </li>
            <li>Maak connecties.</li>
            <li>
              Kijk waar uw innovatie aansluit bij andere actoren in de
              voedselketen.
            </li>
            <li>Toon het winstgevend karakter van uw product.</li>
            <li>
              Maak uw activiteit zichtbaar in het bos van oplossingen voor
              voedselverspilling en voedselverlies.
            </li>
            <li>Toon het commitment van uw bedrijf.</li>
            <li>Toon de positie van uw bedrijf in de voedselketen.</li>
            <li>Gebruik het FWSM netwerk om nieuwe klanten te vinden.</li>
          </ul>
        </div>
      </div>
    </section>
    <FwsmCallToAction />
  </div>
</template>

<style lang="scss">
.fwsm-pricing-table {
  &__column {
    margin-bottom: 4rem;
  }

  &__price {
    min-height: 5rem;
  }

  &__main-price {
    color: $primary;
  }

  &__perks {
    border-top: 1px solid $grey-light;
    margin-top: 1rem;
    padding-top: 2rem;
    margin-bottom: 2rem;
  }

  &__perk-item {
    margin-bottom: 1rem;
  }

  &__card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__cta {
    margin-top: auto;
  }
}
</style>

<script>
import Vue from "vue";
import FwsmCallToAction from "~/components/FWSMCallToAction.vue";
export default {
  components: {
    FwsmCallToAction
  }
};
</script>
