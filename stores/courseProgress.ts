import { useLocalStorage } from '#imports'

export const useCourseProgress = defineStore('courseProgress', () => {
  const progress = useLocalStorage<Record<string, Record<string, boolean>>>(
    'progress',
    {}
  )
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

    // TODO: Update in DB (lesson 6-4)
  }

  return {
    progress,
    initiliaze,
    toggleComplete,
  }
})
