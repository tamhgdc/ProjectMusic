<template>
    <div>
        <data-table :desserts="albums" :headers="headers" :loading="loading" to="/admin/album/create"></data-table>
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
            albums: [],
            headers: [
                { text: 'Tên album',value: 'name' },
                { text: 'Ảnh', value: 'image' },
                { text: 'Ngày ra mắt', value: 'releaseDate'},
                { text: 'Actions', value: 'actions' },
            ],
            loading: true
        }
    },
    created(){
        this.getAllSong()
    },
    methods:{
        getAllSong(){
            axios.get('/album/get-all-album')
            .then( (response) => {
                this.albums = response.data.albums
                this.loading = false
            })
            .catch( () => {
                console.log('fail')
            })
        }
    }
}
</script>