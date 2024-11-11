import { jwtDecode } from 'jwt-decode'

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')

    const getUserRole = () => {
      try {
          if (!token.value) return null
          
          const decoded = jwtDecode(token.value)
          return decoded.user_role // or decoded.role depending on your JWT structure
      } catch (error) {
          console.error('Error decoding token:', error)
          return null
      }
    }

    const userRole = getUserRole()
    console.log('User role:', userRole)
    
    // Public routes that don't require authentication
    const publicRoutes = ['/login']

    const adminRoutes = ['/settings/team']
    
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

    if(userRole && adminRoutes.includes(to.path) && userRole !== 'admin'){
      console.log(userRole)
      return navigateTo('/unauthorized')
    }
})
