<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="linear-gradient(to right, var(--light), var(--dark))"
        :height="5"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
