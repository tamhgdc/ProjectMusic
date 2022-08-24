<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default { 
    mounted(){
        this.$store.dispatch('updateShowMenu', false)
        this.$store.dispatch('sideBar/updateItemSideBars', this.$store.getters['sideBar/itemSideBars'])
    },
    // watch:{
    //     "$route.name": function () {
    //         if(this.$route.path.includes('admin')){
    //             this.$store.dispatch('updateShowFixedPlay', false)
    //         }
    //     },
    // }
}
</script>