<template>
    <header class="flex justify-between items-center">
        <Button @click="addTeamMember"><Icon name="lucide:plus" size="24" /> Team Member</Button>
        <DialogAddTeamMember v-model:open="isDialogOpen" @success="onSuccess" :user="user" />
    </header>
    <main class="mt-4">
        <div class="flex gap-2 items-center my-2">
           <!-- <SelectUser v-bind:selectedUsers="selectedUsers" v-bind:users="users" /> -->
        </div>
        <DataTable :headers="headers" :rows="rows" :rowActions="rowActions" :meta="meta" :hoverColumn="false" @pageChange="onPageChange"/>
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
            selectedUsers: [],
            user: {
                user_id: null,
                user_first_name: '',
                user_last_name: '',
                user_phone: ''
            },
            meta: null,
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
                    action: (row) => {
                        //console.log(row)
                        this.editTeamMember(row)
                    },
                    icon: 'lucide:pencil'
                },
                {
                    id: 2,
                    name: 'Delete',
                    action: (row) => {
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
        onSuccess,
        addTeamMember,
        editTeamMember,
        onPageChange
    },
    mounted(){
        this.getTeamMembers()
    }
}

function onPageChange(page=1) {
    const filter = {
        page: page,
        search: this.search
    }
    //console.log(filter)
    this.getTeamMembers(filter)}

function addTeamMember() {
    this.user = {
        user_id: null,
        user_first_name: '',
        user_last_name: '',
        user_phone: ''
    }
    this.toggleDialog()
}

function editTeamMember(row) {
    this.user = row
    //console.log(row)
    //console.log(this.user)
    this.toggleDialog()
}

function toggleDialog() {
    this.isDialogOpen = !this.isDialogOpen
}

async function getTeamMembers(filter={}) {
    const api = useApi();
    const response = await api.get('/user/get-all', filter)
    //console.log(response)
    this.rows = response.users
    this.meta = response.meta
}

async function deleteTeamMember(id) {
    try{
        const api = useApi();
        const response = await api._delete(`/user/delete/${id}`)
        //console.log(response)
        toast.success('Team member deleted')
        this.getTeamMembers()
    } catch (error) {
        //console.log(error.message)
        toast.error('Error deleting team member')
    }

}

function onSuccess() {
    this.getTeamMembers()
    this.toggleDialog()
}
</script>
