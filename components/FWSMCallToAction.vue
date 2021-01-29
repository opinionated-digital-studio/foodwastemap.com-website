<template>
  <section class="hero is-primary has-text-centered is-bold mt-5">
    <div class="hero-body">
      <div class="container">
        <h3 class="title is-2">
          {{ $t('cta.register.title') }}
        </h3>
        <a href="/sign-up" class="button is-white">{{ $t('auth.signUp') }}</a>
        <a href="mailto:mail@foodwastemap.com" class="button is-white is-outlined">{{ $t('cta.register.action') }}</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FWSMCallToAction"
};
</script>
