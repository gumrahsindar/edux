<script setup lang="ts">
import { useCourse } from '~/composables/useCourse'

const course = useCourse()
const route = useRoute()

const chapter = computed(() => {
  return course.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  )
})

const lesson = computed(() => {
  return chapter.value?.lessons.find(
    (lesson) => lesson.slug === route.params.lessonSlug
  )
})

console.log(chapter)
</script>

<template>
  <div>
    <h1>Chapter</h1>
    <h2>Lesson</h2>
    <p v-if="chapter">
      {{ chapter.title }}
    </p>
    <p v-if="lesson">{{ lesson.title }}</p>
  </div>
</template>

<style scoped></style>
