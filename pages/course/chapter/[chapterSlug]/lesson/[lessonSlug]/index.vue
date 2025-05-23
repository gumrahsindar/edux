<script setup>
const course = await useCourse()
const user = useSupabaseUser()
const route = useRoute()

const { chapterSlug, lessonSlug } = route.params

const lesson = await useLesson(chapterSlug, lessonSlug)
const store = useCourseProgress()
const { initiliaze, toggleComplete } = store

initiliaze()

definePageMeta({
  middleware: [
    async function ({ params }, from) {
      const course = await useCourse()
      const chapter = course.value.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      )
      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: 'Chapter not found',
          })
        )
      }
      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === params.lessonSlug
      )
      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: 'Lesson not found',
          })
        )
      }
      return true
    },
    'auth',
  ],
})

const chapter = computed(() => {
  return (
    course.value.chapters.find(
      (chapter) => chapter.slug === route.params.chapterSlug
    ) || null
  )
})

const title = computed(() => {
  return `${lesson.value?.title} - ${course.value.title} ${lesson.value?.title}`
})

useHead({
  title,
})
</script>

<template>
  <div v-if="chapter && lesson">
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <LessonCompleteButton
      v-if="user"
      :model-value="isCompleted"
      @update:model-value="toggleComplete"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped></style>
