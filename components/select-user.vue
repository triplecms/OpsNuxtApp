<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" role="combobox" :aria-expanded="open" class="flex items-center justify-start"><Icon name="lucide:circle-user" class="mr-2 h-4 w-4" />Select User</Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Search user..."/>
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem v-for="user in filterUsers(availableUsers, selectedUsers)" :key="user.id" :value="user.user_first_name" @click="selectedUsers.push(user)">{{ user.user_first_name }} {{ user.user_last_name }}</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
<script>

export default {
    props: {

        availableUsers: {
            type: Array,
            required: false
        },

        selectedUsers: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            open: false
        }
    },
    methods: {
        filterUsers
    }
}

function filterUsers(users, selectedUsers) {
    console.log(users, selectedUsers);
    return users.filter(user => !selectedUsers.some(selected => selected.user_id === user.user_id));
}
</script>
