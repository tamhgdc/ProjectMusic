<template>
    <div>
        <data-table :desserts="users" :headers="headers" :loading="loading"></data-table>
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
                { text: 'Tên đầy đủ',value: 'fullname' },
                { text: 'Tên đăng nhập', value: 'username' },
                { text: 'Email', value: 'email'},
                { text: 'Ảnh đại diện', value: 'avatar' },
                { text: 'Actions', value: 'actions' }
            ],
            loading: true
        }
    },
    created(){
        this.getAllUser()
        this.$store.dispatch('updateShowMenu', false)
    },
    methods:{
        getAllUser(){
            axios.get('/user/get-all-user')
            .then( (response) => {
                this.users = response.data.users
                this.loading = false
            })
            .catch(() => {
                console.log('fail to get users')
            })
        }
    }
}
</script>