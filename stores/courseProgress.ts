import { useLocalStorage } from '#imports'

export const useCourseProgress = defineStore('courseProgress', () => {
  const progress = ref<any>({})
  const initiliazed = ref(false)

  async function initiliaze() {
    if (initiliazed.value) return
    initiliazed.value = true
  }

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser()
    if (!user.value) return

    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute()
      chapter = chapterSlug as string
      lesson = lessonSlug as string
    }

    const currentProgress = progress.value[chapter]?.[lesson]

    // optimistically uptade the progress
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    }

    // Update the progress in the DB

    try {
      await $fetch(`/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
        method: 'POST',
        body: {
          completed: !currentProgress,
        },
      })
    } catch (error) {
      console.error(error)

      // If the request failed, revert the progress value
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress,
      }
    }
  }

  return {
    progress,
    initiliaze,
    toggleComplete,
  }
})
