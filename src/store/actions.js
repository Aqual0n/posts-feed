import fetchPosts from "../api";
import {
    sendClap,
    fetchUser,
    deletePost
} from "../api";

export default {
    FETCH_POSTS: ({ commit, state }) => (state.posts.length
        ? Promise.resolve(state.posts)
        : fetchPosts().then(posts => commit('SET_POSTS', { posts }))),
    SEND_CLAP: ({commit, getters}, data) => {
        sendClap(data).then(() => commit('ADD_CLAP', {id: data.id, getters}))
    },
    AUTHORIZE_USER: ({ commit }, userData) => {
        return fetchUser(userData.login)
            .then(user => {
                //stingifying user password if its only contains numbers

                const password = typeof user.password === 'string' ? user.password : user.password.toString()

                if(password === userData.password) {
                    const formattedUser = {
                        id: user.id,
                        name: user.login,
                        role: user.role
                    }

                    commit('SET_CURRENT_USER', formattedUser)

                    return formattedUser
                } else {
                    throw new Error('wrong authorization')
                }
            })
            .catch(err => {
                if (err.message === 'no such user') {
                    throw err
                }
                console.log(err)
            })
    },
    DELETE_POST: ({commit}, postId) => {
        deletePost(postId).then(() => commit('REMOVE_POST', postId))
    },
}