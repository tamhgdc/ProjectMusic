import axios from 'axios'
export const postMixin = {
    methods: {
        unfollowing(user){
            axios.post('/following/unfollowing', {
                id: user.id,
                follower: this.currentUser.id
            })
            .then( (response) => {
                if(response.data.message == 'success'){
                    var index = this.followings.findIndex(x => x.user_id == user.id)
                    this.followings.splice(index, 1)
                }
            })
            .catch( (err) => {
                console.log(err)
            })
        },
        following(user){
            if(localStorage.getItem('music_token')){
                axios.post('/following/following', {
                    user_id: user.id,
                    follower: this.currentUser.id
                })
                .then( (response) => {
                    if(response.data.message == 'success'){
                        this.followings.push(response.data.following)
                    }
                })
                .catch( (err) => {
                    console.log(err)
                })
            }else{
                sessionStorage.setItem('backLogin', '/post')
                this.$router.push('/login')
            }
        },
        like(post){
            if(localStorage.getItem('music_token')){
                axios.post('/post/like', {
                    postId : post.id,
                    userId: this.currentUser.id
                })
                .then( (response) => {
                    if(response.data.message == 'success'){
                        var indexPost = this.listPost.findIndex(x => x.id == post.id)
                        this.listPost[indexPost].likes.push(response.data.postlike)
                    }
                })
                .catch( () => {
                    console.log('fail to like')
                })
            }else{
                sessionStorage.setItem('backLogin', '/post')
                this.$router.push('/login')
            }
        },
        unlike(post){
            axios.post('/post/unlike', {
                postId : post.id,
                userId: this.currentUser.id
            })
            .then( (response) => {
                if(response.data.message == 'success'){
                    var indexPost = this.listPost.findIndex(x => x.id == post.id)
                    var indexLikeInPost = this.listPost[indexPost].likes.findIndex(x => x.user_id == this.currentUser.id)
                    this.listPost[indexPost].likes.splice(indexLikeInPost, 1)
                }
            })
            .catch( () => {
                console.log('fail to like')
            })
        }
    }
}