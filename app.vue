<template>
  <div>
    <!-- 
      <NuxtRouteAnnouncer />
      <NuxtWelcome />
    -->
      <NuxtLayout>
        <NuxtPage />
        <Toaster position="bottom-right" />
      </NuxtLayout>
  </div>
</template>
<script setup>
import { Toaster } from 'vue-sonner'
</script>