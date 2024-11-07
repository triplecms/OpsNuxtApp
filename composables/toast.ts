import { toast as sonnerToast } from 'vue-sonner'

export const useToast = () => {
  return {
    success: (title: string, description?: string) => {
      sonnerToast.success(title, {
        description
      })
    },
    error: (title: string, description?: string) => {
      sonnerToast.error(title, {
        description
      })
    },
    info: (title: string, description?: string) => {
      sonnerToast.info(title, {
        description
      })
    },
    warning: (title: string, description?: string) => {
      sonnerToast.warning(title, {
        description
      })
    }
  }
}