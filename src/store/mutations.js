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
}