<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ course.title }}</h1>
    <button
      @click="login"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup>
const course = await useCourse()

const supabase = useSupabaseClient()
const { query } = useRoute()

const login = async () => {
  const redirectTo = query.redirectTo
    ? `${window.location.origin}/confirm?redirectTo=${query.redirectTo}`
    : `${window.location.origin}/confirm`
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  })

  if (error) {
    console.error('Error logging in:', error.message)
  }
}
</script>
