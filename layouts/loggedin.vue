<template>
  <div class="">
    <SidebarProvider :default-open="true">
      <AppSidebar />
      <main class="py-4 pl-4">
        <SidebarTrigger class="mt-3"/>
      </main>
      <main class="p-4 w-full">
        <slot />
      </main>
    </SidebarProvider>
  </div>
</template>
<script>
</script>