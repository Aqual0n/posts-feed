// import Vue from 'vue'

export default {
    SET_POSTS: (state, { posts }) => {
        state.posts = posts
        // Vue.set(state.posts, posts)
    },
    SET_CURRENT_USER: (state, user) => {
        state.currentUser = user

        // Vue.set(state.posts, posts)
    },
    ADD_CLAP: (state, {id, getters}) => {
        getters.getPostById(id).claps += 1
    },
    REMOVE_POST: (state, postId) => {
        state.posts.every((post, index) => {
            if (post.id === postId) {
                state.posts.splice(index, 1)
                return false
            }
            return true
        })
    }
}