import type { Lesson } from '@prisma/client'

export type LessonWithPath = Lesson & {
  path: string
}
