export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    
    // Public routes that don't require authentication
    const publicRoutes = ['/login']
    
    // Check if path starts with /public or is in publicRoutes
    const isPublicPath = to.path.startsWith('/public') || publicRoutes.includes(to.path)
    
    // If route requires auth and no token exists
    if (!isPublicPath && !token.value) {
      return navigateTo('/login')  // Make sure to return the navigation
    }
    
    // If user is logged in and tries to access login page
    if (token.value && publicRoutes.includes(to.path)) {
      return navigateTo('/')  // Make sure to return the navigation
    }
})