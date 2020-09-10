import fetchPosts from "../api";
export default {
    FETCH_POSTS: ({ commit, state }) => (state.posts.length
        ? Promise.resolve(state.posts)
        : fetchPosts().then(posts => commit('SET_POSTS', { posts }))),
}