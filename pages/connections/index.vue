<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li class="is-active">
              <a href="/connections" aria-current="page">Connections</a>
            </li>
          </ul>
        </nav>
        <h1 class="title is-1">Connections</h1>
        <div class="columns">
          <div class="column is-two-thirds">
            <p class="subtitle pb-5 mb-2">
              Bedrijven nemen veelal het voortouw om voedselverspilling en-
              verlies tegen te gaan. Dit uit ideëel doel, een duurzame
              bedrijfsvoering na te streven, maar ook uit oogpunt van het
              verwaarden van afval! Want voedselverspilling tegengaan kan winst
              opleveren!
            </p>
            <p class="mb-5">
              Campagnes, opgezet om voedselverspilling en-verlies te voorkomen
              worden nu veelal gericht op de consument. Bij de consumptie binnen
              de voedselketen is dan ook nog altijd veel winst te behalen! Maar
              het is onterecht om alle andere sectoren binnen de voedselsyclus
              buiten beeld te laten. In Elke sector is winst te behalen! De
              voedselketen kan wordt verdeeld in verschillende sectoren. En elke
              sector heeft zijn eigen activiteiten om voedselverspilling
              en-verlies tegen te gaan.
            </p>
            <p class="mb-5">
              Het landschap van Innovaties, Ideeën en Initiatieven binnen het
              ‘food waste &amp; food loss’ thema is indrukwekkend! Om alle
              beweging binnen de voedselketen op dit thema te bundelen is de
              Food Waste Solution Map (FWSM) ontwikkeld. Om inzicht te krijgen
              in de drijfveren van verschillende ondernemingen en initiatieven
              binnen het ‘food waste &amp; loss’ probleem!
            </p>

            <p class="mb-5">
              De FWSM verdeelt de voedselketen in 5 verschillende sectoren. De
              sectoren kunnen we onderverdelen in verschillende segmenten. Elk
              segment is een onderdeel van de FWSM ! In elk segment is
              activiteit op het gebied van ‘food-waste en ‘food-loss’. In elk
              segment worden innovaties gedaan. In elk segment worden
              oplossingen aangereikt. In elk segment worden mogelijkheden
              geïmplementeerd Om voedselverspilling of verlies te voorkomen
              en/of te verwaarden!
            </p>
            <hr />
          </div>
        </div>

        <nav class="fwsm-sectors">
          <a
            href="/connections/production"
            class="fwsm-sectors__link block"
          >
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/productie.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Productie/oogst</h2>
            </div>
          </a>
          <a href="/connections/processing" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/processing.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Verwerking/productie</h2>
            </div>
          </a>
          <a href="/connections/packaging" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/packaging.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Verpakking, opslag &amp; rijping</h2>
            </div>
          </a>
          <a href="/connections/distribution" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/distribution.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Distributie &amp; transport</h2>
            </div>
          </a>
          <a href="/connections/retail" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/retail.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Retail &amp; consument</h2>
            </div>
          </a>
        </nav>
      </div>
    </section>
    <FWSMPosterDownload />
  </div>
</template>

<style lang="scss" scoped>
.production {
  color: $production;
}

.processing {
  color: $processing;
}

.packaging {
  color: $packaging;
}

.distribution {
  color: $distribution;
}

.retail {
  color: $retail;
}

.fwsm-sectors {
  @include desktop() {
    display: flex;
    flex-wrap: wrap;
  }

  &__icon-container {
    margin-right: 1.8rem;
  }

  &__icon {
    width: 3rem;

    @include desktop() {
      width: 4rem;
    }
  }

  &__link {
    padding: 1rem;
    display: flex;

    @include desktop() {
      padding: 2rem;
      width: 50%;
    }

    &:hover {
      background-color: $white-ter;
    }
  }
}
</style>

<script>
import FWSMPosterDownload from "~/components/FWSMPosterDownload.vue";
import bucket from '~/plugins/cosmic'
export default {
  async asyncData(context) {
    const { objects } = await bucket.getObjects({
      type: 'segments',
      props: 'slug',
      metafields: [{
        key: 'connection',
        value: 'Production',
      }]
    })
    console.log(objects)
  },
  components: {
    FWSMPosterDownload
  }
};
</script>
