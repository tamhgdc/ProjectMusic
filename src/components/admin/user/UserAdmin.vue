<template>
    <router-view></router-view>
</template>

<script>
export default { 
    mounted(){
        this.$store.dispatch('updateShowMenu', false)
        this.$store.dispatch('updateShowFixedPlay', false)
        this.$store.dispatch('sideBar/updateItemSideBars', this.$store.getters['sideBar/itemSideBars'])
    }
}
</script>