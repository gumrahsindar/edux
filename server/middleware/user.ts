import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)
    event.context.user = user
    console.log('context: ', event.context)
  } catch (error) {
    console.error(error)
  }
})
