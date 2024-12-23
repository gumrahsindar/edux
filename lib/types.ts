export type TCourseData = {
  title: string
  chapters: {
    title: string
    slug: string
    number: number
    lessons: {
      title: string
      slug: string
      number: number
      downloadUrl: string
      sourceUrl?: string
      videoId: number
      text: string
    }[]
  }[]
}
