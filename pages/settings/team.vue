<template>
    <header class="flex justify-between items-center">
        <h1>Team</h1>
        <Button @click="toggleDialog"><Icon name="lucide:plus" size="24" /> Team Member</Button>
        <DialogAddTeamMember v-model:open="isDialogOpen" @success="onSuccess" />
    </header>
    <main class="mt-4">
        <DataTable :headers="headers" :rows="rows" :rowActions="rowActions" />
    </main>
</template>
<script>
definePageMeta({
    layout: 'loggedin',
    middleware: ['auth']
})
const toast = useToast()

export default{
    data(){
        return {
            isDialogOpen: false,
            headers:[
                {
                    id : "user_first_name",
                    name : "Name"
                },
                {
                    id : "user_last_name",
                    name: "Surname"
                },
                {
                    id : "user_phone",
                    name: "Phone"
                }
            ],
            rows: [
                {
                    id : 1,
                    name : "John Doe",
                    phone : "0219037704"
                }
            ],
            rowActions: [
                {
                    id: 1,
                    name: 'Edit',
                    action: () => {
                        console.log('Edit')
                    },
                    icon: 'lucide:pencil'
                },
                {
                    id: 2,
                    name: 'Delete',
                    action: (row) => {
                        console.log('Delete')
                        console.log(row)
                        this.deleteTeamMember(row.user_uuid)
                    },
                    icon: 'lucide:trash'
                }
            ]
        }
    },
    methods: {
        toggleDialog,
        getTeamMembers,
        deleteTeamMember,
        onSuccess
    },
    mounted(){
        this.getTeamMembers()
    }
}

function toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen
}

async function getTeamMembers() {
    const api = useApi();
    const response = await api.get('/user/get-all')
    console.log(response)
    this.rows = response.users
}

async function deleteTeamMember(id) {
    const api = useApi();
    const response = await api._delete(`/user/delete/${id}`)
    console.log(response)
    toast.success('Team member deleted')
    this.getTeamMembers()
}

function onSuccess() {
    this.getTeamMembers()
    this.toggleDialog()
}
</script>
