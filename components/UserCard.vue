<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button @click="logout" class="text-sm underline text-slate-500">
        Log out
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const profile = computed(() => user.value?.user_metadata.avatar_url)
const name = computed(() => user.value?.user_metadata.full_name)

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login', { replace: true })
}
</script>
