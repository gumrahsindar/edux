export default async () => {
  const course = await useCourse()
  return (course.value as { chapters: { lessons: any[] }[] }).chapters[0]
    .lessons[0]
}
