
export const useApi = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl

  const get = async <T>(endpoint: string, params = {}) => {
    const token = useCookie('token')  // Add this line
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      }
    })
  }

  const post = async <T>(endpoint: string, payload: any) => {
    try {
      const token = useCookie('token')  // Add this line
      //console.log('Request URL:', `${baseUrl}${endpoint}`)
      //console.log('Request Payload:', payload)

      return await $fetch<T>(`${baseUrl}${endpoint}`, {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
      })
    } catch (err) {
      console.error('API Error:', err)
      throw err
    }
  }

  const _delete = async <T>(endpoint: string, options = {}) => {
    const token = useCookie('token')  // Add this line
    const queryString = options.params ? `?${new URLSearchParams(options.params)}` : '';
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      ...options
    })
  }

  const put = async <T>(endpoint: string, payload: any) => {
    const token = useCookie('token')  // Add this line
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      body: payload,
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })
  }

  return {
    get,
    post,
    _delete,
    put
  }
}
