<script setup lang="ts">
const user = useSupabaseUser()
const { query } = useRoute()

watch(
  user,
  async () => {
    if (user.value) {
      // Redirect to protected page
      await navigateTo((query.redirectTo as string) || '/', { replace: true })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>Waiting for login...</div>
</template>
