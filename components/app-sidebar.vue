<template>
  <Sidebar defaultOpen="true">
    <SidebarHeader>
      <img src="/triplec-logo.svg" alt="Logo" class="h-[60px]" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarGroup>
        <SidebarGroupLabel>Admin</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <a href="/tasks">
                <Icon name="lucide:calendar-check-2" size="24" />
                <span>Tasks</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenu>
          </SidebarGroupContent> 
        </SidebarGroup>
      </SidebarMenu>
      <!--<SidebarMenuButton asChild>
        <a href="/tenders">
          <Icon name="lucide:hard-hat" size="24" />
          <span>Tenders</span>
        </a>
      </SidebarMenuButton>
      <SidebarMenuButton asChild>
        <a href="/plant">
          <Icon name="lucide:tractor" size="24" />
          <span>Plant</span>
        </a>
      </SidebarMenuButton>
      <SidebarMenuButton asChild>
        <a href="/tools">
          <Icon name="lucide:drill" size="24" />
          <span>Tools</span>
        </a>
      </SidebarMenuButton>
      <SidebarMenuButton asChild>
        <a href="/stock">
          <Icon name="lucide:warehouse" size="24" />
          <span>Stock</span>
        </a>
      </SidebarMenuButton>
      <SidebarMenuButton asChild>
        <a href="/suppliers">
          <Icon name="lucide:store" size="24" />
          <span>Suppliers</span>
        </a>
      </SidebarMenuButton>
      <SidebarGroup>
        <SidebarGroupLabel></SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
          </SidebarMenu>
        </SidebarGroupContent> 
      </SidebarGroup> -->
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu class="w-full">
            <DropdownMenuTrigger class="w-full">
              <SidebarMenuButton class="flex items-center justify-between w-full">
                <span>Username</span>
                <Icon name="i-heroicons-chevron-up" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <!--<DropdownMenuItem @click="navigateTo('/settings/profile')">Profile</DropdownMenuItem>-->
              <DropdownMenuItem @click="navigateTo('/settings/team')">Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async logout() {
      const tokenCookie = useCookie('token')
      tokenCookie.value = null

      navigateTo('/login')
    }
  }
}
</script>
