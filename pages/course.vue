<script setup lang="ts">
const { chapters } = useCourse()
const route = useRoute()

const resetError = async (error: Ref<Error | null>) => {
  await navigateTo(
    '/course/chapter-1-chapter-1/lesson-1-introduction-to-typescript-with-vue-js-3'
  )
  error.value = null
}
</script>

<template>
  <div class="prose mb-12">
    <h1>
      <span class="font-medium">
        Course:
        <span class="font-bold">Mastering Nuxt 3</span>
      </span>
    </h1>
  </div>
  <div class="flex flex-row justify-center flex-grow">
    <div
      class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
    >
      <h3>Chapters</h3>
      <div
        class="space-y-1 mb-4 flex flex-col"
        v-for="chapter in chapters"
        :key="chapter.slug"
      >
        <h4>{{ chapter.title }}</h4>
        <NuxtLink
          class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1"
          :class="{
            'text-blue-500': lesson.path === route.path,
            'text-gray-600': lesson.path !== route.path,
          }"
          v-for="(lesson, index) in chapter.lessons"
          :key="lesson.slug"
          :to="lesson.path"
        >
          <span class="text-gray-500"> {{ index + 1 }}.</span>
          <span>{{ lesson.title }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="prose p-12 bg-white rounded-md w-[65ch]">
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error }">
          <p>Sth went wrong with the lesson</p>
          <code>{{ error }}</code>
          <button @click="resetError(error)">Clear error</button>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<style scoped></style>
