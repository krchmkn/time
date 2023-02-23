<template>
  <div :class="$style.layout">
    <header :class="$style.header">
      <AppHeader />
    </header>

    <main :class="$style.main">
      <NuxtPage />
    </main>

    <footer :class="$style.footer">
      Developed with
      <NuxtLink to="https://nuxt.com/" target="_blank" rel="noopener" external>Nuxt</NuxtLink>
      and
      <NuxtLink to="https://www.timeapi.io/" target="_blank" rel="noopener" external>timeapi.io</NuxtLink>.
      Source code is stored on
      <NuxtLink to="https://github.com/krchmkn/time" target="_blank" rel="noopener" external>Github</NuxtLink>.
    </footer>
  </div>
</template>

<style module>
.layout {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  text-align: center;
}

.header,
.main,
.footer {
  padding: 1rem;
}

.header {
  grid-area: header;
}

.main {
  grid-area: main;
  align-self: center;
}

.footer {
  grid-area: footer;
}
</style>