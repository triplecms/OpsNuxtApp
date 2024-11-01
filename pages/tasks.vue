<template>
    <header class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
            <h1>Tasks</h1>
            <Popover v-model:open="open">
            <PopoverTrigger as-child>
                <Button variant="outline" role="combobox" :aria-expanded="open" class="w-[200px]">Select User</Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0">
                <Command>
                    <CommandInput class="h-9" placeholder="Search user..." />
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        </div>
        <div class="flex gap-2 items-center">
            <Icon name="lucide:search" size="24" />
            <Input type="text" placeholder="Search" />
            <Button @click="toggleDialog"><Icon name="lucide:plus" size="24" /> Add Task</Button>
            <DialogAddTask v-model:open="isDialogOpen" />
        </div>
    </header>
    <main class="flex flex-col gap-4">
        
    </main>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'TasksPage',
    data() {
        return {
            tasks: [],
            isDialogOpen: false,
            open: false,
            users: [
                {
                    id: 1,
                    name: 'John Doe'
                },
                {
                    id: 2,
                    name: 'Jane Doe'
                },
                {
                    id: 3,
                    name: 'Jim Doe'
                }
            ]
        }
    },
    methods: {
        toggleDialog
    }
}

function toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen
}
</script>
