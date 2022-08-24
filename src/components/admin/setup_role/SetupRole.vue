<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('updateShowMenu', false)
        this.$store.dispatch('sideBar/updateItemBelowSideBars', [
            { title: "Slide", icon: "mdi-image-area" ,to:'/admin/slide'},
        ])
        this.$store.dispatch('sideBar/updateItemSideBars', this.$store.getters['sideBar/itemSideBars'])
    }
}
</script>