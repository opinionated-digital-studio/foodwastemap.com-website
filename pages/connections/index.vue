<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><nuxt-link :to="localePath('/')">{{ $t('pages.home') }}</nuxt-link></li>
            <li class="is-active">
              <nuxt-link :to="localePath('/connections')" aria-current="page">{{ $t('pages.connections') }}</nuxt-link>
            </li>
          </ul>
        </nav>
        <h1 class="title is-1">{{ currentPage.title }}</h1>
        <div class="columns">
          <div class="column is-two-thirds">
            <p class="subtitle pb-5 mb-2">
              {{currentPage.metadata.lead}}
            </p>
            <div class="content" v-html="currentPage.content"></div>
            <hr />
          </div>
        </div>

        <nav class="fwsm-sectors">
          <nuxt-link
            :to="localePath('/connections/production')"
            class="fwsm-sectors__link block"
          >
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/productie.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Production and post harvesting</h2>
              <span>{{ $t('common.readMore') }}</span>
            </div>
          </nuxt-link>
          <nuxt-link :to="localePath('/connections/processing')" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/processing.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Processing</h2>
              <span>{{ $t('common.readMore') }}</span>
            </div>
          </nuxt-link>
          <nuxt-link :to="localePath('/connections/packaging')" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/packaging.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Packaging, storage and ripening</h2>
              <span>{{ $t('common.readMore') }}</span>
            </div>
          </nuxt-link>
          <nuxt-link :to="localePath('/connections/distribution')" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/distribution.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Distribution</h2>
              <span>{{ $t('common.readMore') }}</span>
            </div>
          </nuxt-link>
          <nuxt-link :to="localePath('/connections/retail')" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon-container">
              <img class="fwsm-sectors__icon" src="~/assets/images/retail.png" alt="" srcset="">
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Retail</h2>
              <span>{{ $t('common.readMore') }}</span>
            </div>
          </nuxt-link>
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
    const { object } = await bucket.getObject({
      slug: "connections",
      locale: context.app.i18n.localeProperties.iso,
    });
    return {
      currentPage: object
    }
  },
  components: {
    FWSMPosterDownload
  }
};
</script>
