<template>
  <div :class="$style.container">
    <img
      src="@/assets/images/info-icon.webp"
      width="24"
      height="24"
      alt="Open information icon"
      loading="lazy"
      :class="$style.action"
      @click="open = true"
    />

    <div ref="content">
      <AppTransition
        name="fade"
        @after-enter="onAfterEnter"
        @after-leave="onAfterLeave"
      >
        <AppBlock
          v-if="open"
          :class="$style.content"
        >
          <p :class="$style.header">
            <img
              src="@/assets/images/close-icon.webp"
              width="24"
              height="24"
              alt="Close information icon"
              loading="lazy"
              :class="$style.action"
              @click="open = false"
            />
          </p>

          <div>
            <p v-for="({ text, link }) in list" :key="unique()">
              {{ text }}
              <NuxtLink
                :to="link.href"
                target="_blank"
                rel="noopener" external>{{ link.text }}</NuxtLink>.
            </p>
          </div>
        </AppBlock>
      </AppTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
const opened = ref(false)

const list = [
  {
    text: 'Developed with',
    link: { href: 'https://nuxt.com', text: 'Nuxt' }
  },
  {
    text: 'Data from',
    link: { href: 'https://www.timeapi.io/', text: 'timeapi.io' }
  },
  {
    text: 'Source code is stored on',
    link: { href: 'https://github.com/krchmkn/time', text: 'Github' }
  },
  {
    text: 'App icons from',
    link: { href: 'https://www.flaticon.com', text: 'flaticon.com' }
  }
]

function onAfterEnter() {
  opened.value = true
}

function onAfterLeave() {
  opened.value = false
}

const content = ref(null)
function handleClickOutside (event: MouseEvent) {
  if (content.value && opened.value && !event.composedPath().includes(content.value)) {
    open.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style module>
.container {
  position: relative;
  display: grid;
  place-content: end;
}

.content {
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: left;
}

.header {
  text-align: right;
}

.action {
  cursor: pointer;
  transition: transform .25s;
  background: rgba(255, 255, 255, .5);
  border-radius: 59%;
}

.action:active {
  transform: scale3d(0.95, 0.95, 0.95);
}
</style>