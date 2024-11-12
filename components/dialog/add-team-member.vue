<template>
    <Dialog v-model:open="open">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Team Member</DialogTitle>
            </DialogHeader>
            <Input v-model="user.user_first_name" placeholder="Name" id="name" name="name"/>
            <Input v-model="user.user_last_name" placeholder="Surname" id="surname" name="surname"/>
            <Input v-model="user.user_phone" placeholder="Phone" id="phone" name="phone"/>
            <DialogFooter>
                <Button @click="save" v-if="!user.user_id">Save</Button>
                <Button @click="update" v-else>Update</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script>
const toast = useToast()

export default {
    name: 'DialogAddTeamMember',
    props: {
        user: {
            type: Object,
            default: {
                user_id: null,
                user_first_name: '',
                user_last_name: '',
                user_phone: ''
            }
        }
    },
    data() {
        return {
            open: false,
        }
    },
    methods: {
        save,
        update
    }
}
async function save() {
    try{
        //console.log('Save');
        const api = useApi();
        const response = await api.post('/user/create', {
            user_first_name: this.user.user_first_name,
            user_last_name: this.user.user_last_name,
            user_phone: this.user.user_phone
        })
        this.open = false;
        toast.success('Team member created')
        this.$emit('success');
    } catch (error) {
        //console.log('Error');
        toast.error('Error creating team member')
    }

}
async function update() {
    try{

    //console.log('Update', this.user);
    const api = useApi();
    const response = await api.put(`/user/update/${this.user.user_id}`, {
        user_first_name: this.user.user_first_name,
        user_last_name: this.user.user_last_name,
        user_phone: this.user.user_phone
        })
        toast.success('Team member updated')
        this.$emit('success');
    } catch (error) {
        //console.log('Error');
        //console.log(error);
        toast.error('Error updating team member')
    }
}
</script>
