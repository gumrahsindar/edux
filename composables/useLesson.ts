export default async (chapterSlug: string, lessonSlug: string) => {
  const nuxtApp = useNuxtApp()
  console.log('nuxtApp', nuxtApp)
  const { data, error } = await useFetch(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
    {
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    }
  )

  if (error.value) {
    throw createError({
      ...error.value,

      statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
    })
  }

  return data
}
