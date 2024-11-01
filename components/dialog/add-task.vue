<template>
    <Dialog v-bind:open="isOpen">
        <DialogContent class="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle class="flex gap-2 items-center">Add Task
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
    </DialogTitle>
                <DialogDescription>Add a new task to the calendar</DialogDescription>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <Input v-model="title" placeholder="Title" />
            <Textarea v-model="description" placeholder="Description" class="min-h-[100px]" />
            <DialogFooter>
                <DialogClose asChild>
                    <Button>Save</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            title: '',
            description: '',
            users: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
                { id: 3, name: 'Jim Doe' }
            ],
            open: false
        }
    }
}
</script>