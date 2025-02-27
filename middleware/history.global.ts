export default defineNuxtRouteMiddleware((to, from) => {
  const navigationHistory = useLocalStorage<string[]>('history', [])
  navigationHistory.value.push(to.path)
})
