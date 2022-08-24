<template>
    <div>
        <data-table :desserts="genres" :headers="headers" :loading="loading" to="/admin/genre/create"></data-table>
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
            genres: [],
            headers: [
                { text: 'Tên thể loại',value: 'name' },
                { text: 'Mô tả', value: 'description'},
                { text: 'Ảnh', value: 'image' },
                { text: 'Actions', value: 'actions' },
            ],
            loading: true
        }
    },
    created(){
        this.getAllGenre()
    },
    methods:{
        getAllGenre(){
            axios.get('/genre/get-all-genre')
            .then( (response) => {
                this.genres = response.data.genres
                this.loading = false
            })
            .catch( () => {
                console.log('fail')
            })
        }
    }
}
</script>