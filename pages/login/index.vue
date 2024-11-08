<template>
    <div class="flex justify-center items-center h-screen">
    <Card class="w-full max-w-md m-2">
        <CardHeader>
            <img src="/triplec-logo.svg" alt="Logo" class="h-[90px]" />
        </CardHeader>
        <CardContent v-if="!validateOtp">
            <Input type="tel" placeholder="Phone Number" v-model="phoneNumber"/>
        </CardContent>
        <CardContent v-if="validateOtp" class="flex justify-center items-center">
            <PinInput
                id="pin-input"
                v-model="otpValue"
                placeholder="○"
                @complete="handleComplete">
                <PinInputGroup>
                    <PinInputInput
                        v-for="(id, index) in 6"
                        :key="id"
                        :index="index"
                    />
                </PinInputGroup>
            </PinInput>
        </CardContent>
        <CardFooter>
            <Button v-if="validateOtp" @click="cancel" class="w-full">Cancel</Button>
            <Button v-if="!validateOtp" @click="validate" class="w-full">Login</Button>
        </CardFooter>
    </Card>
  </div>
</template>
<script>
const toast = useToast()
export default {
    name: 'IndexPage',
    data() {
        return {
            phoneNumber: '',
            validateOtp: false,
            otpValue: []
        }
    },
    methods: {
        validate,
        cancel,
        handleComplete,
    }
}
async function validate() {
    try{
        console.log('Login clicked');
        const api = useApi();
        const response = await api.post('/user/initiate-otp', {
            phone: this.phoneNumber
        });
        if (response) {
            this.validateOtp = true;
        }
    } catch (error) {
        console.log('Error');
        console.log(error);
        toast.error('Failed to initiate OTP', 'Please try again later')

    }
}

async function handleComplete() {
    try{
        console.log('Login clicked');
        const api = useApi();
        const response = await api.post('/user/verify-otp', {
            phone: this.phoneNumber,
            otp: this.otpValue
        });
        if (response) {
            console.log('OTP verified');
            console.log(response);
            const tokenCookie = useCookie('token')
            tokenCookie.value = response.token
            navigateTo('/');
        }
    } catch (error) {
        console.log('Error');
        console.log(error);
        toast.error('Failed to initiate OTP', 'Please try again later')
    }

}

function cancel() {
    this.validateOtp = false;
}

</script>
