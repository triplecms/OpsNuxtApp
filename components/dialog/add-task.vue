<template>
    <Dialog v-bind:open="isOpen">
        <DialogContent class="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle class="flex gap-2 items-center justify-between mr-5">Add Task
                    <Popover v-model:open="open">
            <PopoverTrigger as-child>
                <Button variant="ghost" role="combobox" :aria-expanded="open" class="w-8 h-8 mr-2"><Avatar><Icon name="lucide:user" size="24"/></Avatar></Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0">
                <Command>
                    <CommandInput class="h-9" placeholder="Search user..." />
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem>John Doe</CommandItem>
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
            description: ''
        }
    }
}
</script>