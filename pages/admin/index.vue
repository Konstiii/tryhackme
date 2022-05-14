<script lang="ts" setup>

const resp = await useFetch(`/api/admin`)
console.log('AdminPage', resp.data.value)

// interface Data {
//     flag: string
// }

// interface ErrorBody {
//     statusMessage: string
// }

// const token = ref('')

// const errorMessage = ref('')
// const setErrorMessage = (newValue: string) => errorMessage.value = newValue
// const clearErrorMessage = () => errorMessage.value = ''

// const flag = ref('')
// const setFlag = (newValue: string) => flag.value = newValue

// const { req } = useRequestEvent()
// const { data, error } = await useFetch<Data>('/api/admin', {
//     headers: {
//         'authorization': req.headers.authorization
//     }
// })
// console.log(data.value, error.value)

// if (error.value) {
//     setErrorMessage('Invalid token')
// } else {
//     setFlag(data.value.flag)
    
// }

// const submit = async () => {
//     console.log('Submitting:', token.value)

//     const { data, error } = await useFetch<Data, ErrorBody>(`/api/admin`, { headers: {
//         'Authorization': token.value
//     }})
    
    // if (error.value) {
    //     setErrorMessage('Invalid token')
    // } else {
    //     setFlag(data.value.flag)
        
    // }
// }

// if (resp.error) {
//     setErrorMessage(resp.error.value as any as string)
// } else {
//     setFlag(resp.data.value)
// }


</script>

<template>
    <div>

        <p>Admin Page</p>

        <!-- <input type="text" v-model="token"/>
        <button @click="submit">Submit</button> -->
        <!-- <p v-if="error">{{ error }}</p>
        <p v-if="data">{{ data.flag }}</p> -->
    </div>
</template>

<style lang="scss" scoped>

</style>
