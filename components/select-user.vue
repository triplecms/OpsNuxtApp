<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" role="combobox" :aria-expanded="open" class="flex items-center justify-start"><Icon name="lucide:circle-user" class="mr-2 h-4 w-4" />Select User</Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Search user..." @keyup="searchUsers" />
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem v-for="user in users" :key="user.id" :value="user.user_uuid" @click="selectedUsers.push(user); users.splice(users.indexOf(user), 1)">{{ user.user_first_name }} {{ user.user_last_name }}</CommandItem>
                    </CommandGroup>
                    </CommandList>
                </Command>
        </PopoverContent>
    </Popover>
</template>
<script>
export default {
    props: {
        selectedUsers: {
            type: Array,
            required: true
        },
        users: {
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
        searchUsers
    }
}

async function searchUsers(event) {
    console.log(event.target.value)
    const searchPhrase = event.target.value.toLowerCase();
    this.users = await this.users.filter(user => {
        const fullName = `${user.user_first_name} ${user.user_last_name}`.toLowerCase();
        return fullName.includes(searchPhrase);
    });
}
</script>
