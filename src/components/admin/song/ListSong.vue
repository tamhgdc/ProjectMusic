<template>
    <div>
        <data-table 
        :desserts="songs" 
        :headers="headers"
        :loading="loading"
        to="/admin/song/create"
        >
        </data-table>
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
            songs: [],
            headers: [
                { text: 'Tên',value: 'name' },
                { text: 'Lyrics', value: 'lyrics' },
                { text: 'Thời lượng', value: 'timeDuration' },
                { text: 'Ảnh', value: 'image' },
                { text: 'Link source', value: 'src' },
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
            axios.get('/song/get-all-song')
            .then( (response) => {
                this.songs = response.data.songs
                this.loading = false
            })
            .catch( (response) => {
                console.log(response)
            })
        }
    }
}
</script>