<template>
    <div>
        <data-table :desserts="users" :headers="headers" :loading="loading" to="/admin/setup-role/create"></data-table>
    </div>
</template>

<script>
import axios from 'axios'
import DataTable from '../general_component/DataTable.vue'
export default {
    components:{
        DataTable
    },
    data(){
        return{
            users: [],
            headers: [
                { text: 'Tên tài khoản',value: 'username' },
                { text: 'Actions', value: 'actions' },
            ],
            loading: true
        }
    },
    created(){
        this.getAllUserHasRole()
    },
    methods:{
        getAllUserHasRole(){
            axios.get('/user/role/get-all-user-has-role')
            .then( (response) => {
                this.users = response.data.users
                this.loading = false
            })
            .catch( () => {
                console.log('fail')
            })
        }
    }
}
</script>