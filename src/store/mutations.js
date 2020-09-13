// import Vue from 'vue'

export default {
    SET_POSTS: (state, { posts }) => {
        state.posts = posts
        // Vue.set(state.posts, posts)
    },
    SET_POST: (state, post) => {
        state.posts.push(post)
        // Vue.set(state.posts, posts)
    },
    SET_CURRENT_USER: (state, user) => {
        state.currentUser = user

        // Vue.set(state.posts, posts)
    },
    UPDATE_POST: (state, {post, getters}) => {
        Object.keys(getters.getPostById(post.id)).forEach(key => {
            getters.getPostById(post.id)[key] = post[key]
        })
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