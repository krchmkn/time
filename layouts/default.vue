<template>
  <div :class="$style.layout">
    <header :class="$style.header">
      <AppHeader />
    </header>

    <main :class="$style.main">
      <slot />
    </main>

    <footer :class="$style.footer">
      <AppResources />
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
  min-height: 100vh;
  margin: 0 auto;
  text-align: center;
}

@media (min-width: 801px) and (max-width: 2000px) {
  .layout {
    max-width: 800px;
  }
}

.header,
.main,
.footer {
  padding: var(--measure);
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