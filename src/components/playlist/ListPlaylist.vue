<template>
    <div>
        <data-table :desserts="playlists" :headers="headers" to="/playlist/create"></data-table>
    </div>
</template>

<script>
import axios from 'axios'
import DataTable from '../admin/general_component/DataTable.vue'
export default {
    components:{
        DataTable
    },
    data(){
        return{
            playlists: [],
            headers: [
                { text: 'Tên playlist',value: 'name' },
                { text: 'Ngày tạo', value: 'created_at'},
                { text: 'Actions', value: 'actions' },
            ]
        }
    },
    created(){
        this.getAllPlaylist()
    },
    methods:{
        getAllPlaylist(){
            axios.get('/playlist/get-all-playlist-user')
            .then( (response) => {
                this.playlists = response.data.playlists
                this.playlists.map(x => x.created_at = new Date(x.created_at).toLocaleString())
            })
            .catch( () => {
                console.log('fail')
            })
        }
    }
}
</script>