export const individualMixin = {
    methods: {
        choose(id){
            switch(id){
                case 1: {
                    if(this.$route.name != 'mymusic-song'){
                        this.$router.push('/mymusic')
                    }
                    break
                }
                case 2: {
                    if(this.$route.name != 'mymusic-playlist'){
                        this.$router.push('/mymusic/playlist')
                    }
                    break
                }
                case 3: {
                    if(this.$route.name != 'mymusic-album'){
                        this.$router.push('/mymusic/album')
                    }
                    break
                }
                case 4: {
                    if(this.$route.name != 'mymusic-mv'){
                        this.$router.push('/mymusic/mv')
                    }
                    break
                }
            }
        }
    }
}